<?php

namespace Vexpro\GerminiPay\Model;

use Magento\Store\Model\ScopeInterface;
use Magento\Quote\Api\Data\PaymentInterface;
use Magento\Payment\Model\Method\AbstractMethod;
use Magento\Payment\Model\Method\Cc;


class GerminiPay extends AbstractMethod
{
    const CODE = 'Vexpro_GerminiPay';

    protected $_code = self::CODE;

    protected $_canAuthorize = true;
    protected $_canCapture = true;
    protected $_canRefund = true;
    protected $_isGateway = true;
    protected $_canVoid = true;
    protected $_canCancel = true;

    protected $nit;
    protected $merchant_usn;
    protected $sitef_usn;
    protected $cc_date;
    protected $cc_number;
    protected $authorizer_id;
    protected $customer_id;
    protected $token;


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

    // 7636

    /**
     * Capture Payment.
     *
     * @param \Magento\Payment\Model\InfoInterface $payment
     * @param float $amount
     * @return $this
     */
    public function capture(\Magento\Payment\Model\InfoInterface $payment, $amount)
    {
        try {
            //check if payment has been authorized
            if (is_null($payment->getParentTransactionId())) {
                $this->authorize($payment, $amount);
            }

            $order = $payment->getOrder();

            $this->customer_id = $order->getCustomerId();

            $cc_exp_month = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_exp_month'];
            $cc_exp_year = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_exp_year'];
            $cc_number = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_number'];
            $this->cc_number = $cc_number;
            $cc_cid = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_cid'];

            // Configura expdate no formato MMAA
            $cc_date = $cc_exp_year . "-" . $cc_exp_month;
            $format = 'Y-m';
            $date = date_create_from_format($format, $cc_date);
            $expdate = date_format($date, "my");
            $this->expdate = $expdate;

            // Cria os parametros para o armazenamento de cartao REST
            $params = [
                "card" => [
                    "expiry_date" => $this->expdate,
                    "number" => $this->cc_number
                ],
                "authorizer_id" => $this->authorizer_id,
                "merchant_usn" => $this->merchant_usn,
                "customer_id" => $this->customer_id
            ];

            $response = $this->makeStoreCardRequest($params);

            $order->setSitefToken($response['token']);
            $this->token = $response['token'];

            //build array of payment data for API request.
            $params = [
                "card" => [
                    "token" => $response['token'],
                    "security_code" => $cc_cid
                ],
            ];

            //make API request to credit card processor.
            $response = $this->makeCaptureRequest($params);

            $order->setSitefUsn($this->sitef_usn);



            //transaction is done.
            $payment->setIsTransactionClosed(1);
        } catch (\Exception $e) {
            $this->debug($e->getMessage());
        }

        return $this;
    }

    /**
     * Authorize a payment.
     * Autorizaçao: quando faz a transaçao com o cartão de crédito e existe um feedback
     * da adiquirente (operadora da transação) que confirma os dados estão com, saldo ok etc... (pre autorização a transação)
     *
     * @param \Magento\Payment\Model\InfoInterface $payment
     * @param float $amount
     * @return $this
     */
    public function authorize(\Magento\Payment\Model\InfoInterface $payment, $amount)
    {
        $cpf = $payment->getAdditionalInformation('post_data_value')['additional_data']['cpf'];
        $nome = $payment->getAdditionalInformation('post_data_value')['additional_data']['nome'];
        $parcelas = $payment->getAdditionalInformation('post_data_value')['additional_data']['parcelas'];
        $cc_type = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_type'];

        $autorizadoras = array(
            'AE' => 3,
            'VI' => 1,
            'MC' => 2,
            'DI' => 44,
            'JCB' => 43,
            'DN' => 33
        );
        $authorizer_id = $autorizadoras[$cc_type];
        $this->authorizer_id = $authorizer_id;


        // 1) Criando a transação

        try {
            $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
            $checkoutSession = $objectManager->get('Magento\Checkout\Model\Session');
            $quote = $checkoutSession->getQuote();
            $merchant_usn = $quote->getReservedOrderId();
            $this->merchant_usn = $merchant_usn;
            $params = [
                "merchant_usn" => $merchant_usn,
                "order_id" => $merchant_usn,
                "installments" => $parcelas,
                "installment_type" => "4",
                "authorizer_id" => $authorizer_id,
                "amount" => $amount * 100,
            ];

            $response = $this->makeAuthRequest($params);
        } catch (\Exception $e) {
            $this->debug($e->getMessage());
        }

        if (isset($response['transactionId'])) {
            // Successful auth request.
            // Set the transaction id on the payment so the capture request knows auth has happened.
            $payment->setTransactionId($response['transactionId']);
            $payment->setParentTransactionId($response['transactionId']);
        }

        //processing is not done yet.
        $payment->setIsTransactionClosed(0);

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

    public function makeStoreCardRequest($params)
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
        $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

        $data_json = json_encode($params);
        $url = $esitef_url . '/cards';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'merchant_id: ' . $merchant_id,
            'merchant_key: ' . $merchant_key
        ));

        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response  = curl_exec($ch);
        curl_close($ch);
        $dados = json_decode($response);
        $this->token = $dados->card->token;

        $response = ['token' => $dados->card->token];

        return $response;
    }

    /**
     * Method to handle an API call for authorization request.
     *
     * @param $params
     * @return array
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function makeAuthRequest($params)
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
        $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

        $data_json = json_encode($params);
        $url = $esitef_url . '/transactions';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'merchant_id: ' . $merchant_id,
            'merchant_key: ' . $merchant_key
        ));

        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response  = curl_exec($ch);
        curl_close($ch);
        $dados = json_decode($response);
        $nit = $dados->payment->nit;
        $this->nit = $nit;

        $response = ['transactionId' => $nit]; //todo implement API call for auth request.
        if (!$response) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Failed auth request.'));
        }

        return $response;
    }

    /**
     * Test method to handle an API call for capture request.
     *
     * @param $request
     * @return array
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function makeCaptureRequest($params)
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
        $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        // 2) Efetuando o pagamento
        try {
            $data_json = json_encode($params);
            $url = "{$esitef_url}/payments/{$this->nit}";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'merchant_id: ' . $merchant_id,
                'merchant_key: ' . $merchant_key
            ));

            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response  = curl_exec($ch);
            curl_close($ch);
            $dados = json_decode($response);

            $sitef_usn = $dados->payment->esitef_usn;
            $this->sitef_usn = $sitef_usn;

            $response = ['success'];
            if (!$response) {
                throw new \Magento\Framework\Exception\LocalizedException(__('Failed capture request.'));
            }
        } catch (\Exception $e) {
            $this->debug($e->getMessage());
            $response = ['fail'];
        }
        return $response;
    }

    /**
     * Refund specified amount for payment
     *
     * @param \Magento\Framework\DataObject|InfoInterface $payment
     * @param float $amount
     * @return $this
     * @throws \Magento\Framework\Exception\LocalizedException
     * @api
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function refund(\Magento\Payment\Model\InfoInterface $payment, $amount)
    {
        if (!$this->canRefund()) {
            throw new \Magento\Framework\Exception\LocalizedException(__('The refund action is not available.'));
        }
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
        $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

        $order = $payment->getOrder();
        $sitef_usn = $order->getSitefUsn();

        // 1) Criando a transação de cancelamento
        $url = "{$esitef_url}/cancellations";

        $params = [
            "esitef_usn" => $sitef_usn,
        ];

        try {
            $data_json = json_encode($params);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'merchant_id: ' . $merchant_id,
                'merchant_key: ' . $merchant_key
            ));

            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response  = curl_exec($ch);
            curl_close($ch);
            if (!$response) {
                throw new \Magento\Framework\Exception\LocalizedException(__('Failed refund request.'));
            }
        } catch (\Exception $e) {
            $this->debug($e->getMessage());
            $response = ['fail'];
        }
        return $this;
    }
}
