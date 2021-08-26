<?php

namespace Vexpro\GerminiPay\Model;

use Magento\Payment\Model\Method\AbstractMethod;

// Pagamento com Saldo da Carteira

class GerminiPay2 extends AbstractMethod
{
    const CODE = 'Vexpro_GerminiPay2';
    const PAYMENT_TYPE = 2;
    protected $_code = self::CODE;

    protected $_canAuthorize = true;
    protected $_canCapture = true;
    // protected $_canRefund = true;
    protected $_isGateway = true;
    // protected $_canVoid = true;
    protected $_canCancel = true;

    protected $nit;
    protected $merchant_usn;
    protected $TRACKING_CODE;
    protected $cc_date;
    protected $cc_number;
    protected $authorizer_id;
    protected $customer_id;
    protected $token;
    protected $allOrders;

    protected $pontosCliente;
    protected $saldoCliente;
    protected $totalSeed;
    protected $produtoSemPonto = false;
    protected $transactionId;

    protected $orderTotalValue;
    protected $grandTotal;

    public function _construct()
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $customerSession = $objectManager->create('Magento\Customer\Model\Session');

        $customer = $customerSession->getCustomer();

        $saldoCliente = $customer->getSaldoCliente();
        $this->saldoCliente = $saldoCliente;

        $pontosCliente = $customer->getPontosCliente();
        $this->pontosCliente = $pontosCliente;

        $cart = $objectManager->get('\Magento\Checkout\Model\Cart');
        $items = $cart->getQuote()->getAllItems();

        $this->grandTotal = $cart->getQuote()->getGrandTotal();

        $totalPoints = 0;
        foreach ($items as $item) {
            $productData = $objectManager->create('Magento\Catalog\Model\Product')->load($item->getProductId());

            //if (null !== ($item->getAdditionalData()))
            //{
            $pointsRedeemed = (int) $productData->getPontosProduto();
            if ($pointsRedeemed == 0)
                $this->produtoSemPonto = true;
            $totalPoints += $pointsRedeemed;
            //}
        }
        $this->totalSeed = $totalPoints;
    }

    public function isAvailable(\Magento\Quote\Api\Data\CartInterface $quote = null)
    {
        if (!$this->isActive($quote ? $quote->getStoreId() : null)) {
            return false;
        }
        $flag_available = false;

        if ($this->saldoCliente >= $this->grandTotal) {
            $flag_available = true;
        }
        return $flag_available;
    }

    public function validate()
    {
        parent::validate();

        if ($this->saldoCliente < $this->grandTotal) {
            throw new \Magento\Framework\Exception\LocalizedException(
                __('você não possuí saldo suficiente')
            );
        }

        return true;
    }

    public function getTitle()
    {
        $walletFormatted = number_format(floatval($this->saldoCliente), 2, ',', '.');
        $totalFormatted = number_format(floatval($this->grandTotal), 2, ',', '.');

        return "Pagar com Saldo da Carteira Digital: Você possui Saldo de R$ {$walletFormatted} - Será usado R$ {$totalFormatted}";
    }

    /**
     * Set value after save payment from post data to use in case capture or authorize
     * @param \Magento\Framework\DataObject $data
     * @return $this
     */
    public function assignData(\Magento\Framework\DataObject $data)
    {
        parent::assignData($data);
        $this->getInfoInstance()
            ->setAdditionalInformation('post_data_value', $data->getData());

        return $this;
    }

    /**
     * Capture Payment.
     *
     * @param \Magento\Payment\Model\InfoInterface $payment
     * @param float $amount
     * @return $this
     */
    public function capture(\Magento\Payment\Model\InfoInterface $payment, $amount)
    {
        //     //check if payment has been authorized
        //     if (is_null($payment->getParentTransactionId())) {
        $this->authorize($payment, $amount);
    }


    public function makeGerminiRedemption($order)
    {
        try {
            $objectManager = \Magento\Framework\App\ObjectManager::getInstance();

            $customerSession = $objectManager->get('\Magento\Customer\Model\Session');
            $germiniToken = $customerSession->getCustomerToken();

            $logger = $objectManager->create('\Psr\Log\LoggerInterface');

            $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
            $url_base = $scopeConfig->getValue('acessos/general/kernel_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
            $customer = $objectManager->get('Magento\Customer\Api\CustomerRepositoryInterface')->getById($this->customer_id);
            $customerCPFCNPJ = $customer->getTaxvat();

            $partnercnpj = $scopeConfig->getValue('acessos/general/partnercnpj', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);


            $params = [
                "consumerCPF" => (int) preg_replace("/[^0-9]/", "", $customerCPFCNPJ),
                "partnerCNPJ" => $partnercnpj,
                "value" => $this->orderTotalValue,
                "PaymentType" => $this::PAYMENT_TYPE
            ];

            $data_json = json_encode($params);
            $url = "{$url_base}/api/DigitalWallet/CreateRedemption";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                "Authorization: bearer {$germiniToken}"
            ));
            $response  = curl_exec($ch);
            $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpcode != 200) {
                $logger->info('Saldo insuficiente');
                throw new \Magento\Framework\Exception\LocalizedException(__('Saldo insuficiente.'));
            }

            $dados = json_decode($response);

            $trackingCode = $dados->data->operationId;

            $order->setTrackingCode($trackingCode);

            $params = [
                "consumerCPF" => (int) preg_replace("/[^0-9]/", "", $customerCPFCNPJ),
                "partnerCNPJ" => $partnercnpj,
                "trackingCode" => $trackingCode,
                "capture" => true,
                "paymentType" => $this::PAYMENT_TYPE,
                "value" => $this->orderTotalValue,
                "ApprovalChannel" => 1
            ];

            $paymentCode = $dados->data->code;
            $order->setPaymentCode($paymentCode);
            $order->setPaymentType($this::PAYMENT_TYPE);

            $data_json = json_encode($params);
            $url = "{$url_base}/api/DigitalWallet/ValidateRedemption";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                "Authorization: bearer {$germiniToken}"
            ));
            $response  = curl_exec($ch);

            $dados = json_decode($response);

            $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpcode != 200) {
                $logger->info('Saldo insuficiente');
                throw new \Magento\Framework\Exception\LocalizedException(__('Saldo insuficiente.'));
            }
            if (null !== $dados->errors) {
                $logger->info('Saldo insuficiente');
                $messageManager = $objectManager->create('Magento\Framework\Message\ManagerInterface');
                $messageManager->addError("Erro ao autenticar no Magento");
                throw new \Magento\Framework\Exception\LocalizedException(__($dados->errors[0]->message));
                $response = ['fail'];
            }
            $logger->info("{$customerCPFCNPJ} -> resgate de SD {$this->totalSeed}");

            $customer = $customerSession->getCustomer();
            $customerSession->setSapEdit(false);

            $novoValorSaldo = $this->saldoCliente - $this->orderTotalValue;
            $customer->setSaldoCliente($novoValorSaldo);

            $this->transactionId = $dados->data->operationId;
            $customer->save();
            $customerSession->setSapEdit(true);
        } catch (\Exception $e) {
            $this->debug($e->getMessage());
            $response = ['fail'];
        }
        return $dados;
    }

    /**
     * Authorize a payment.
     *
     * @param \Magento\Payment\Model\InfoInterface $payment
     * @param float $amount
     * @return $this
     */
    public function authorize(\Magento\Payment\Model\InfoInterface $payment, $amount)
    {
        $order = $payment->getOrder();
        $this->customer_id = $order->getCustomerId();

        $orderTotalValue = $order->getGrandTotal();
        $this->orderTotalValue = $orderTotalValue;

        if ($this->totalSeed > 0 || $this->saldoCliente > $orderTotalValue) {
            try {
                $this->makeGerminiRedemption($order);
            } catch (\Exception $e) {
                throw new \Magento\Framework\Exception\LocalizedException(__('Falha no resgate por saldo da carteira.'));
            }
        }

        $payment->setIsTransactionClosed(1);
        return $this;
    }

    /**
     * Set the payment action to authorize_and_capture
     *
     * @return string
     */
    public function getConfigPaymentAction()
    {
        return self::ACTION_AUTHORIZE_CAPTURE;
    }
}
