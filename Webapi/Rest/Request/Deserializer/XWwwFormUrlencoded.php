<?php
namespace Vexpro\GerminiPay\Webapi\Rest\Request\Deserializer;

use Magento\Framework\App\State;
use Magento\Framework\Phrase;

class XWwwFormUrlencoded implements \Magento\Framework\Webapi\Rest\Request\DeserializerInterface
{
    /** @var \Vexpro\GerminiPay\Model\PostbackNotification\Decoder */
    protected $decoder;

    /**
     * @var State
     */
    protected $_appState;

    /**
     * @param \Vexpro\GerminiPay\Model\PostbackNotification\Decoder $decoder
     * @param \Magento\Framework\App\State $appState
     */
    public function __construct(
        \Vexpro\GerminiPay\Model\PostbackNotification\Decoder $decoder, State $appState)
    {
        $this->decoder = $decoder;
        $this->_appState = $appState;
    }

    /**
     * Parse Request body into array of params.
     *
     * @param string $encodedBody Posted content from request.
     * @return array|null Return NULL if content is invalid.
     * @throws \InvalidArgumentException
     * @throws \Magento\Framework\Webapi\Exception If decoding error was encountered.
     */
    public function deserialize($encodedBody)
    {
        if (!is_string($encodedBody)) {
            throw new \InvalidArgumentException(
                sprintf('"%s" data type is invalid. String is expected.', gettype($encodedBody))
            );
        }
        try {
            $decodedBody = $this->decoder->decode($encodedBody);
            // s, nsu, orderId, nit, pedido, codigoLoja
        } catch (\Zend_Json_Exception $e) {
            if ($this->_appState->getMode() !== State::MODE_DEVELOPER) {
                throw new \Magento\Framework\Webapi\Exception(new Phrase('Decoding error.'));
            } else {
                throw new \Magento\Framework\Webapi\Exception(
                    new Phrase(
                        'Decoding error: %1%2%3%4',
                        [PHP_EOL, $e->getMessage(), PHP_EOL, $e->getTraceAsString()]
                    )
                );
            }
        }

        $nit = $decodedBody['nit'];
        $orderId = (int)$decodedBody['orderId'];
        // $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        // $orderInterface = $objectManager->create('Magento\Sales\Api\Data\OrderInterface');
        // $order = $orderInterface->loadByIncrementId($orderId);
        // $payment = $order->getPayment();
        // $amount_paid = $payment->getAmountPaid();

        // $token = $order->getSitefToken();

        // $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        // $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
        // $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        // $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        // $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

        // // Criando o serviço de cancelamento
        // $url = "{$esitef_url}/cancellations/{$nit}";

        // $params = [
        //     "card" => [
        //         "token" => $token
        //     ],
        //     "amount" => $amount_paid
        // ];

        // try {
        //     $data_json = json_encode($params);
        //     $ch = curl_init();
        //     curl_setopt($ch, CURLOPT_URL, $url);
        //     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        //     curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        //         'Content-Type: application/json',
        //         'merchant_id: ' . $merchant_id,
        //         'merchant_key: ' . $merchant_key
        //     ));

        //     curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
        //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        //     $response  = curl_exec($ch);
        //     curl_close($ch);
        //     if (!$response) {
        //         throw new \Magento\Framework\Exception\LocalizedException(__('Failed refund request.'));
        //     }
        // } catch (\Exception $e) {
        //     $this->debug($e->getMessage());
        //     $response = ['fail'];
        // }



        return $decodedBody;
    }
}
