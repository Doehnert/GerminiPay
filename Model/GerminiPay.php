<?php

use Magento\Store\Model\ScopeInterface;

namespace Vexpro\GerminiPay\Model;

class GerminiPay extends \Magento\Payment\Model\Method\Cc
{
    const CODE = 'Vexpro_GerminiPay';

    protected $_code = self::CODE;

    protected $_canAuthorize = true;
    protected $_canCapture = true;

    protected $scopeConfig;

    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    )
    {
        $this->scopeConfig = $scopeConfig;
    }    

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
        $url_esitef = $this->scopeConfig->getValue('acessos/general/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
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
        try {

            $cpf = $payment->getAdditionalInformation('post_data_value')['additional_data']['cpf'];
            $nome = $payment->getAdditionalInformation('post_data_value')['additional_data']['nome'];
            $parcelas = $payment->getAdditionalInformation('post_data_value')['additional_data']['parcelas'];
            $token = $payment->getAdditionalInformation('post_data_value')['additional_data']['token'];

            $ccNumber = $payment->getCcNumber();

            ///build array of payment data for API request.
            $request = [
                'cc_type' => $payment->getCcType(),
                'cc_exp_month' => $payment->getCcExpMonth(),
                'cc_exp_year' => $payment->getCcExpYear(),
                'cc_number' => $ccNumber,
                'amount' => $amount,
                'cpf' => $cpf
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