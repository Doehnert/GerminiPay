<?php
namespace Vexpro\GerminiPay\Model\Api;

use Magento\Framework\Event\ManagerInterface as EventManager;
use Vexpro\GerminiPay\Api\PaymentInterface;

class Payment implements PaymentInterface
{
    protected $orderFactory;

    /**
    * @var EventManager
    */
    private $eventManager;

    public $nit;
    public $orderId;

    public function _construct(

    )
    {

    }

    /*
    * @param \Magento\Framework\Event\ManagerInterface as EventManager
    */
    public function __construct(
        EventManager $eventManager,
        \Magento\Sales\Api\Data\OrderInterfaceFactory $orderFactory
    )
    {
        $this->eventManager = $eventManager;
        $this->orderFactory = $orderFactory;
    }

    public function __destruct()
    {
         $data = new \Magento\Framework\DataObject(array(
            'nit' => $this->nit,
            'orderId' => $this->orderId
        ));
        $this->eventManager->dispatch('vexpro_germinipay_service_cancel', ['data' => $data]);
    }

    /**
     * @api
     * @param string nit
     * @param string orderId
     * @return string
     */
    public function getPost($nit, $orderId)
    {
        $this->nit = $nit;
        $this->orderId = $orderId;

        $response = ['success' => false];
        try {
            $response = ['success' => true];
        } catch (\Exception $e) {
            $response = ['success' => false, 'message' => $e->getMessage()];
        }
        $returnArray = json_encode($response);

        return $returnArray;
    }

}
