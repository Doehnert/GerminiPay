<?php
namespace Vexpro\GerminiPay\Plugin;

class CancelManagement
{
    /**
     * @param \Vexpro\GerminiPay\Model\Api\Payment $subject
     * @param null $result
     * @return void
     */
    public function afterGetPost(\Vexpro\GerminiPay\Model\Api\Payment $subject)
    {
        // $nit = $subject->nit;
        // $orderId = (int)$subject->orderId;

        // $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        // // $order = $objectManager->create('\Magento\Sales\Model\OrderRepository')->get($orderId);
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
    }
}
