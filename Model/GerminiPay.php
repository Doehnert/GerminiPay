<?php

use Magento\Store\Model\ScopeInterface;

namespace Vexpro\GerminiPay\Model;

class GerminiPay extends \Magento\Payment\Model\Method\Cc
{
    const CODE = 'Vexpro_GerminiPay';

    protected $_code = self::CODE;

    protected $_canAuthorize = true;
    protected $_canCapture = true;
    
    /**
     * Set value after save payment from post data to use in case capture or authorize
     * @param \Magento\Framework\DataObject $data
     * @return $this
     */
    public function assignData(\Magento\Framework\DataObject $data)
    {
        parent::assignData($data);
        $this->getInfoInstance()->setAdditionalInformation('post_data_value', $data->getData());

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
        try {
            //check if payment has been authorized
            if(is_null($payment->getParentTransactionId())) {
                $this->authorize($payment, $amount);
            }

            //build array of payment data for API request.
            $request = [
                'capture_amount' => $amount,
                //any other fields, api key, etc.
            ];

            //make API request to credit card processor.
            $response = $this->makeCaptureRequest($request);

            //todo handle response

            //transaction is done.
            $payment->setIsTransactionClosed(1);

        } catch (\Exception $e) {
            $this->debug($payment->getData(), $e->getMessage());
        }

        return $this;
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
        // try {

        //     $cpf = $payment->getAdditionalInformation('post_data_value')['additional_data']['cpf'];
        //     $nome = $payment->getAdditionalInformation('post_data_value')['additional_data']['nome'];
        //     $parcelas = $payment->getAdditionalInformation('post_data_value')['additional_data']['parcelas'];
        //     $cc_exp_month = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_exp_month'];
        //     $cc_exp_year = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_exp_year'];
        //     $cc_number = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_number'];
        //     $cc_type = $payment->getAdditionalInformation('post_data_value')['additional_data']['cc_type'];

        //     // Configura expdate no formato MMAA
        //     $cc_date = $cc_exp_year . "-" . $cc_exp_month;
        //     $format = 'Y-m';
        //     $date = date_create_from_format($format, $cc_date);
        //     $expdate = date_format($date, "my");


        //     $objectManager = \Magento\Framework\App\ObjectManager::getInstance();

        //     $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');

        //     $esitef_url = $scopeConfig->getValue(
        //         'payment/Vexpro_GerminiPay/esitef_url',
        //         \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        //     );
        //     $merchant_id = $scopeConfig->getValue(
        //         'payment/Vexpro_GerminiPay/merchant_id',
        //         \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        //     );

        //     $merchant_key = $scopeConfig->getValue(
        //         'payment/Vexpro_GerminiPay/merchant_key',
        //         \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        //     );

        //     // $cart = $objectManager->get('\Magento\Checkout\Model\Cart'); 
        //     // get quote items array
        //     // $items = $cart->getQuote()->getAllItems();

        //     // merchant_usn vai ser o id da compra a ser efetuada
        //     $checkoutSession = $objectManager->get('Magento\Checkout\Model\Session');
        //     $quote = $checkoutSession->getQuote();
        //     $merchant_usn = $quote->getReservedOrderId();

        //     // customer_id vai ser o id do cliente
        //     $customerSession = $objectManager->get('Magento\Customer\Model\Session'); 
        //     $customerData = $customerSession->getCustomer()->getData(); //get all data of customerData
        //     $customer_id = $customerSession->getCustomer()->getId();//get id of customer

        //     $order = $checkoutSession->getLastRealOrder();

        //     $url = $esitef_url . '/cards';

        //     $autorizadoras = array(
        //         'AE' => 3,
        //         'VI' => 1,
        //         'MC' => 2,
        //         'DI' => 44,
        //         'JCB' => 43,
        //         'DN' => 33
        //     );

        //     $authorizer_id = $autorizadoras[$cc_type];

        //     $params = [
        //         "card" => [
        //             "expiry_date" => $expdate,
        //             "number" => $cc_number
        //         ],
        //         "authorizer_id" => $authorizer_id,
        //         "merchant_usn" => $merchant_usn,
        //         "customer_id" => $customer_id
        //     ];
            
        //     $data_json = json_encode($params);

        //     $ch = curl_init();
        //     curl_setopt($ch, CURLOPT_URL, $url);
        //     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'merchant_id: '. $merchant_id, 'merchant_key: '. $merchant_key));

        //     curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
        //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        //     $response  = curl_exec($ch);

        //     curl_close($ch);

        //     $dados = json_decode($response);

        //     $token = $dados->card->token;


        //     ///build array of payment data for API request.
        //     $request = [
        //         'cc_type' => $payment->getCcType(),
        //         'cc_exp_month' => $payment->getCcExpMonth(),
        //         'cc_exp_year' => $payment->getCcExpYear(),
        //         'cc_number' => $cc_number,
        //         'amount' => $amount,
        //         'cpf' => $cpf
        //     ];
        //     $request = [
        //         'cc_type' => 1
        //     ];

        //     //check if payment has been authorized
        //     $response = $this->makeAuthRequest($request);

        // } catch (\Exception $e) {
        //     $this->debug($payment->getData(), $e->getMessage());
        // }
        try {
 
            ///build array of payment data for API request.
            $request = [
                'cc_type' => $payment->getCcType(),
                'cc_exp_month' => $payment->getCcExpMonth(),
                'cc_exp_year' => $payment->getCcExpYear(),
                'cc_number' => $payment->getCcNumberEnc(),
                'amount' => $amount
            ];
 
            //check if payment has been authorized
            $response = $this->makeAuthRequest($request);
 
        } catch (\Exception $e) {
            $this->debug($payment->getData(), $e->getMessage());
        }  

        if(isset($response['transactionID'])) {
            // Successful auth request.
            // Set the transaction id on the payment so the capture request knows auth has happened.
            $payment->setTransactionId($response['transactionID']);
            $payment->setParentTransactionId($response['transactionID']);
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

    /**
     * Test method to handle an API call for authorization request.
     * TODO: Communicate with the Germini API to get a payment request
     *
     * @param $request
     * @return array
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function makeAuthRequest($request)
    {
        $response = ['transactionId' => 123]; //todo implement API call for auth request.

        if(!$response) {
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
    public function makeCaptureRequest($request)
    {
        $response = ['success']; //todo implement API call for capture request.

        if(!$response) {
            throw new \Magento\Framework\Exception\LocalizedException(__('Failed capture request.'));
        }

        return $response;
    }
}