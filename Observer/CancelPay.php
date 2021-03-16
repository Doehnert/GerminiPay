<?php
namespace Vexpro\GerminiPay\Observer;

class CancelPay implements \Magento\Framework\Event\ObserverInterface
{
    public function __construct(\Vexpro\GerminiPay\Model\Session $session)
    {
        $this->session = $session;
    }

    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $myEventData = $observer->getData('data');

        $nit = $myEventData['nit'];
        $orderId = $myEventData['orderId'];

        // $payment = $observer->getEvent()->getPayment();

        // $creditmemo = $observer->getEvent()->getCreditmemo();
        // $order = $creditmemo->getOrder();

        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $orderInterface = $objectManager->create('Magento\Sales\Api\Data\OrderInterface');
        $order = $orderInterface->loadByIncrementId($orderId);

        // $nit = $order->getSitefNit();

        // $objectManager =  \Magento\Framework\App\ObjectManager::getInstance();
        // $session = $objectManager->get('\Magento\Persistent\Model\Session');

        // $session = $objectManager->get('\Vexpro\GerminiPay\Model\Session');

        // $teste = $session->getExampleArry();

        // $nit = $session->getNit();
        // $orderId = $session->getOrderId();


        // $myEventData = $observer->getData('data');
        // $nit = $myEventData['nit'];
        // $orderId = $myEventData['orderId'];

        // $order = $objectManager->create('\Magento\Sales\Model\OrderRepository')->get($orderId);

        // $orderInterface = $objectManager->create('Magento\Sales\Api\Data\OrderInterface');
        // $order = $orderInterface->loadByIncrementId($orderId);
        $payment = $order->getPayment();
        $amount_paid = $payment->getAmountPaid();

        $token = $order->getSitefToken();

        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $scopeConfig = $objectManager->create('Magento\Framework\App\Config\ScopeConfigInterface');
        $esitef_url = $scopeConfig->getValue('payment/Vexpro_GerminiPay/esitef_url', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_id = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_id', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $merchant_key = $scopeConfig->getValue('payment/Vexpro_GerminiPay/merchant_key', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

        // Criando o serviço de cancelamento
        $url = "{$esitef_url}/cancellations/{$nit}";

        $params = [
            "card" => [
                "token" => $token
            ],
            "amount" => $amount_paid
        ];

        try {
            $data_json = json_encode($params);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
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
    }
}
