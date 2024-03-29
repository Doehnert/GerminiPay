<?php

namespace Vexpro\GerminiPay\Model;

use Magento\Payment\Model\Method\AbstractMethod;
use phpDocumentor\Reflection\PseudoTypes\True_;

class GerminiPay extends AbstractMethod
{
    const CODE = 'Vexpro_GerminiPay';
    const PAYMENT_TYPE = 1;

    protected $_code = self::CODE;

    protected $_canAuthorize = true;
    protected $_canCapture = true;
    protected $_canRefund = true;
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
            $quantity = $item->getQty();
            //if (null !== ($item->getAdditionalData()))
            //{
            $pointsRedeemed = (int) $productData->getPontosProduto();
            if ($pointsRedeemed == 0)
                $this->produtoSemPonto = true;
            $totalPoints += $pointsRedeemed * $quantity;
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
        if ($this->produtoSemPonto == false && $this->pontosCliente >= $this->totalSeed) {
            $flag_available = true;
        }

        return $flag_available;
    }

    public function validate()
    {
        parent::validate();

        if ($this->pontosCliente < $this->totalSeed) {
            throw new \Magento\Framework\Exception\LocalizedException(
                __('você não possuí pontos suficientes')
            );
        }

        return true;
    }

    public function getTitle()
    {
        $pointsFormatted = number_format(floatval($this->pontosCliente), 0, ',', '.');
        $totalFormatted = number_format(floatval($this->totalSeed), 0, ',', '.');

        return "Pagar com Pontos: Saldo atual SD$ {$pointsFormatted} - será utilizado SD {$totalFormatted}";
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
    //     }
    //     try {
    //         // Caso o pagamento seja concluído segue para a API Invoice que irá
    //         // seguir com a integração no Germini
    //         $date = gmdate("Y-m-d\TH:i:s\Z");

    //         function getRandomString($n)
    //         {
    //             $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //             $randomString = '';

    //             for ($i = 0; $i < $n; $i++) {
    //                 $index = rand(0, strlen($characters) - 1);
    //                 $randomString .= $characters[$index];
    //             }

    //             return $randomString;
    //         }

    //         $order = $payment->getOrder();
    //         $total = $order->getBaseGrandTotal();
    //         $totalCurrency = $order->getGrandTotal();

    //         $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
    //         $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
    //         $customer = $objectManager->get('Magento\Customer\Api\CustomerRepositoryInterface')->getById($this->customer_id);
    //         $customerName = $customer->getFirstName();
    //         $customerLastName = $customer->getLastName();
    //         $customerCPFCNPJ = $customer->getTaxvat();
    //         $partnercnpj = $scopeConfig->getValue('acessos/general/partnercnpj', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

    //         $params = [
    //             "date" => $date,
    //             "code" => $order->getIncrementId(),
    //             "partnerCNPJ" => $partnercnpj,
    //             "activitySector" => "ecommerce",
    //             "consumerCPFCNPJ" => (int) preg_replace("/[^0-9]/", "", $customerCPFCNPJ),
    //             "consumerName" => $customerName . ' ' . $customerLastName,
    //             "total" => $total,
    //             "totalCurrency" => $totalCurrency,
    //             "documentID" => getRandomString(3),
    //             "documentKey" => getRandomString(3),
    //             "documentOperation" => 1,
    //             "channelTypeId" => 2,
    //             "invoiceItems" => $this->allOrders
    //         ];

    //         // $response = $this->makeGerminiRequest($params);

    //         // if ($order->getGrandTotal() == 0){
    //         //$payment->setIsTransactionClosed(1);

    //         $payment->setTransactionId($this->transactionId);
    //         $payment->setIsTransactionClosed(1);
    //         return $this;
    //         // }

    //         $cc_exp_month = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_exp_month'];
    //         $cc_exp_year = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_exp_year'];
    //         $cc_number = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_number'];
    //         $this->cc_number = $cc_number;
    //         $cc_cid = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_cid'];
    //         $cpf_titular = $payment->getAdditionalInformation('post_data_value')['additional_data']['cpf'];
    //         $nome_titular = $payment->getAdditionalInformation('post_data_value')['additional_data']['nome'];

    //         // Configura expdate no formato MMAA
    //         $cc_date = $cc_exp_year . "-" . $cc_exp_month;
    //         $format = 'Y-m';
    //         $date = date_create_from_format($format, $cc_date);
    //         $expdate = date_format($date, "my");
    //         $this->expdate = $expdate;

    //         // Cria os parametros para o armazenamento de cartao REST
    //         $params = [
    //             "card" => [
    //                 "expiry_date" => $this->expdate,
    //                 "number" => $this->cc_number
    //             ],
    //             "authorizer_id" => $this->authorizer_id,
    //             "merchant_usn" => $this->merchant_usn,
    //             "customer_id" => $this->customer_id
    //         ];

    //         $response = $this->makeStoreCardRequest($params);

    //         $order->setSitefToken($response['token']);
    //         $this->token = $response['token'];

    //         //build array of payment data for API request.
    //         $params = [
    //             "card" => [
    //                 "token" => $response['token'],
    //                 "security_code" => $cc_cid
    //             ],
    //         ];

    //         //make API request to credit card processor.
    //         $dados = $this->makeCaptureRequest($params);

    //         $order->setSitefUsn($this->TRACKING_CODE);

    //         //transaction is done.
    //         $payment->setIsTransactionClosed(1);
    //     } catch (\Exception $e) {
    //         $this->debug($e->getMessage());
    //     }

    //     return $this;
    // }

    public function makeGerminiRedemption($order)
    {
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
            "consumerCPF" => preg_replace("/[^0-9]/", "", $customerCPFCNPJ),
            "partnerCNPJ" => $partnercnpj,
            "value" => $this->totalSeed,
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
            throw new \Magento\Framework\Exception\LocalizedException(__('Saldo insuficiente.'));
        }

        $dados = json_decode($response);

        if ($dados->success == false) {
            throw new \Magento\Framework\Exception\LocalizedException(__($dados->errors[0]->message));
        }
        $trackingCode = $dados->data->operationId;
        $order->setTrackingCode($trackingCode);

        $params = [
            "consumerCPF" => preg_replace("/[^0-9]/", "", $customerCPFCNPJ),
            "partnerCNPJ" => $partnercnpj,
            "trackingCode" => $trackingCode,
            "capture" => true,
            "paymentType" => $this::PAYMENT_TYPE,
            "value" => $this->totalSeed,
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
            $logger->info("Germini respondeu codigo {$httpcode}");

            throw new \Magento\Framework\Exception\LocalizedException(__('Saldo insuficiente.'));
        }
        if (null !== $dados->errors) {
            $logger->info($dados->errors[0]->message);
            throw new \Magento\Framework\Exception\LocalizedException(__('Saldo insuficiente.'));
        }
        $logger->info("{$customerCPFCNPJ} -> resgate de SD {$this->totalSeed}");

        $customer = $customerSession->getCustomer();
        $customerSession->setSapEdit(false);
        $novoValorPontos = $this->pontosCliente - $this->totalSeed;
        $customer->setPontosCliente($novoValorPontos);

        $this->transactionId = $dados->data->operationId;
        $customer->save();
        $customerSession->setSapEdit(true);

        return $dados;
    }

    // public function makeGerminiRequest($params)
    // {
    //     try {
    //         $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
    //         $logger = $objectManager->create('\Psr\Log\LoggerInterface');

    //         $customerSession = $objectManager->get('\Magento\Customer\Model\Session');
    //         $germiniToken = $customerSession->getCustomerToken();


    //         $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');

    //         $url_base = $scopeConfig->getValue('acessos/general/kernel_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

    //         $data_json = json_encode($params);
    //         $url = "{$url_base}/api/Invoice";
    //         $ch = curl_init();
    //         curl_setopt($ch, CURLOPT_URL, $url);
    //         curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    //         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //         curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    //             "Content-Type: application/json",
    //             "Authorization: bearer {$germiniToken}"
    //         ));
    //         $response  = curl_exec($ch);
    //         curl_close($ch);
    //         $resposta = json_decode($response);
    //         if (!$response || $resposta->success != true) {
    //             $logger->info("Consumidor CPF: {$params['consumerCPFCNPJ']} -> Falha na integração com o Germini");
    //             throw new \Magento\Framework\Exception\LocalizedException(__('Falha na integração com o Germini'));
    //         }
    //     } catch (\Exception $e) {
    //         $this->debug($e->getMessage());
    //         $response = ['fail'];
    //     }
    //     return $resposta;
    // }

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
        // Pega dados do formulario
        // $cpf = $payment->getAdditionalInformation('post_data_value')['additional_data']['cpf'];
        // $nome = $payment->getAdditionalInformation('post_data_value')['additional_data']['nome'];
        // $parcelas = $payment->getAdditionalInformation('post_data_value')['additional_data']['parcelas'];
        // $cc_type = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_type'];
        // $senha = $payment->getAdditionalInformation('post_data_value')['additional_data']['senha'];
        // $paymenttype = $payment->getAdditionalInformation('post_data_value')['additional_data']['paymentType'];

        $order = $payment->getOrder();
        $this->customer_id = $order->getCustomerId();
        // 1) Verifica no Germini através da API CreateTransactionRedemption se
        // o usuário tem a pontuação requerida para resgate.
        // $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        // $cart = $objectManager->get('\Magento\Checkout\Model\Cart');
        // $customer = $objectManager->get('Magento\Customer\Api\CustomerRepositoryInterface')->getById($this->customer_id);
        // $customerCPFCNPJ = $customer->getTaxvat();
        // $customerName = $customer->getFirstName();
        // $customerLastName = $customer->getLastName();
        // $items = $cart->getQuote()->getAllItems();

        // $allOrders = [];
        // foreach ($items as $item) {
        //     $productData = $objectManager->create('Magento\Catalog\Model\Product')->load($item->getProductId());
        //     $totalPoints = 0;
        //     $pointsRedeemed = 0;
        //     //if (null !== ($item->getAdditionalData()))
        //     //{
        //     $pointsRedeemed = (int) $productData->getPontosProduto();
        //     $totalPoints += $pointsRedeemed;
        //     //}

        //     $newOrder = [
        //         "code" => $item->getSku(),
        //         "description" => $productData->getName(),
        //         "quantity" => $item->getQty(),
        //         "unitPrice" => $item->getBasePrice(),
        //         "totalPrice" => $item->getPrice() * $item->getQty(),
        //         "unity" => $productData->getUnidade(),
        //         "pointsRedeemed" => $pointsRedeemed,
        //         "pointsRedeemedDiscount" => 0
        //     ];

        //     array_push($allOrders, $newOrder);
        // }
        // $this->allOrders = $allOrders;
        $orderTotalValue = $order->getGrandTotal();
        $this->orderTotalValue = $orderTotalValue;

        // if ($this->totalSeed > 0 || $this->saldoCliente > $orderTotalValue) {
        try {
            $this->makeGerminiRedemption($order);
            $order->setPontosUsados($this->totalSeed);
            $payment->setTransactionId($this->transactionId);
        } catch (\Exception $e) {
            throw new \Magento\Framework\Exception\LocalizedException(__($e->getMessage()));
        }
        // }

        $payment->setIsTransactionClosed(1);
        return $this;

        // Se pagamento apenas com pontos termina a transacao aqui
        // if ($order->getGrandTotal() == 0)
        // {
        //$payment->setIsTransactionClosed(1);
        // return $this;
        // }

        // 2) Authorize
        // $autorizadoras = array(
        //     'AE' => 3,
        //     'VI' => 1,
        //     'MC' => 2,
        //     'DI' => 44,
        //     'JCB' => 43,
        //     'DN' => 33
        // );

        // $cc_type = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_type'];

        // $authorizer_id = $autorizadoras[$cc_type];
        // $this->authorizer_id = $authorizer_id;


        // // 1) Criando a transação

        // try {
        //     $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        //     $checkoutSession = $objectManager->get('Magento\Checkout\Model\Session');
        //     $quote = $checkoutSession->getQuote();
        //     $merchant_usn = $quote->getReservedOrderId();
        //     $this->merchant_usn = $merchant_usn;

        //     $order = $payment->getOrder();
        //     $totalCurrency = $order->getGrandTotal();

        //     $params = [
        //         "merchant_usn" => $merchant_usn,
        //         "order_id" => $merchant_usn,
        //         "installments" => $parcelas,
        //         "installment_type" => "4",
        //         "authorizer_id" => $authorizer_id,
        //         "amount" => $totalCurrency * 100,
        //     ];

        //     $response = $this->makeAuthRequest($params);
        // } catch (\Exception $e) {
        //     $this->debug($e->getMessage());
        // }

        // if (isset($response['transactionId'])) {
        //     // Set the transaction id on the payment so the capture request knows auth has happened.
        //     $payment->setTransactionId($response['transactionId']);
        //     $payment->setParentTransactionId($response['transactionId']);
        // }

        // //processing is not done yet.
        // $payment->setIsTransactionClosed(0);

        // return $this;
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

    // public function makeStoreCardRequest($params)
    // {
    //     $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
    //     $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
    //     $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    //     $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    //     $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

    //     $data_json = json_encode($params);
    //     $url = $esitef_url . '/cards';
    //     $ch = curl_init();
    //     curl_setopt($ch, CURLOPT_URL, $url);
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    //         'Content-Type: application/json',
    //         'merchant_id: ' . $merchant_id,
    //         'merchant_key: ' . $merchant_key
    //     ));

    //     curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //     $response  = curl_exec($ch);
    //     curl_close($ch);
    //     $dados = json_decode($response);
    //     $this->token = $dados->card->token;

    //     $response = ['token' => $dados->card->token];

    //     return $response;
    // }

    /**
     * Method to handle an API call for authorization request.
     *
     * @param $params
     * @return array
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    // public function makeAuthRequest($params)
    // {
    //     $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
    //     $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
    //     $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    //     $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    //     $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

    //     $data_json = json_encode($params);
    //     $url = $esitef_url . '/transactions';
    //     $ch = curl_init();
    //     curl_setopt($ch, CURLOPT_URL, $url);
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    //         'Content-Type: application/json',
    //         'merchant_id: ' . $merchant_id,
    //         'merchant_key: ' . $merchant_key
    //     ));

    //     curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //     $response  = curl_exec($ch);
    //     curl_close($ch);
    //     $dados = json_decode($response);
    //     $nit = $dados->payment->nit;
    //     $this->nit = $nit;

    //     $response = ['transactionId' => $nit]; //todo implement API call for auth request.
    //     if (!$response) {
    //         throw new \Magento\Framework\Exception\LocalizedException(__('Failed auth request.'));
    //     }

    //     return $response;
    // }

    /**
     * Test method to handle an API call for capture request.
     *
     * @param $request
     * @return array
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    // public function makeCaptureRequest($params)
    // {
    //     $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
    //     $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
    //     $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    //     $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    //     $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    //     // 2) Efetuando o pagamento
    //     try {
    //         $data_json = json_encode($params);
    //         $url = "{$esitef_url}/payments/{$this->nit}";
    //         $ch = curl_init();
    //         curl_setopt($ch, CURLOPT_URL, $url);
    //         curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    //             'Content-Type: application/json',
    //             'merchant_id: ' . $merchant_id,
    //             'merchant_key: ' . $merchant_key
    //         ));

    //         curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    //         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //         $response  = curl_exec($ch);
    //         curl_close($ch);
    //         $dados = json_decode($response);

    //         $TRACKING_CODE = $dados->payment->eTRACKING_CODE;
    //         $this->TRACKING_CODE = $TRACKING_CODE;

    //         //$response = ['success'];
    //         if (!$response) {
    //             throw new \Magento\Framework\Exception\LocalizedException(__('Failed capture request.'));
    //         }
    //     } catch (\Exception $e) {
    //         $this->debug($e->getMessage());
    //         $response = ['fail'];
    //     }
    //     return $dados;
    // }

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

        // ESTORNO DOS PONTOS USADOS NO GERMINI
        $order = $payment->getOrder();
        $used_points = $order->getPontosUsados();
        $trackingCode = $order->getTrackingCode();

        $transactionId = $payment->getTransactionId();

        $params = [
            "status" => 2,
            "trackingCode" => $trackingCode,
            "paymentType" => $this::PAYMENT_TYPE
        ];

        // Pega o token da sessão
        $catalogSession = $objectManager->create('Magento\Catalog\Model\Session');
        $adminToken = $catalogSession->getToken();

        $logger = $objectManager->create('\Psr\Log\LoggerInterface');

        $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');

        $url_base = $scopeConfig->getValue('acessos/general/kernel_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

        $data_json = json_encode($params);
        $url = "{$url_base}/api/DigitalWallet/UpdateRedemption";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Authorization: bearer {$adminToken}"
        ));
        $response  = curl_exec($ch);
        curl_close($ch);
        $resposta = json_decode($response);
        if (!$response || $resposta->success != true) {
            $logger->info("Falha no estorno!");
            throw new \Magento\Framework\Exception\LocalizedException(__('Falha no estorno dos pontos'));
        }

        $logger->info("Estornado os pontos para a transação ID: {$transactionId}");
        $messageManager = $objectManager->create('Magento\Framework\Message\ManagerInterface');
        $messageManager->addSuccess("Estornado SD {$used_points} para a transação ID: {$transactionId}");


        return $this;
    }
}
