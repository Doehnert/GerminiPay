<?php
namespace Vexpro\GerminiPay\Model\Api;

use Magento\Framework\Event\ManagerInterface as EventManager;
use Vexpro\GerminiPay\Api\PaymentInterface;

use GuzzleHttp\Client;
use GuzzleHttp\ClientFactory;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\ResponseFactory;
use Magento\Framework\Webapi\Rest\Request;

class Payment implements PaymentInterface
{
    /**
     * @var ResponseFactory
     */
    private $responseFactory;

    public $nit;
    public $orderId;

    /**
     * GitApiService constructor
     *
     * @param ClientFactory $clientFactory
     * @param ResponseFactory $responseFactory
     */
    public function __construct(
        ClientFactory $clientFactory,
        ResponseFactory $responseFactory
    ) {
        $this->clientFactory = $clientFactory;
        $this->responseFactory = $responseFactory;
    }


    public function __destruct()
    {
         $data = new \Magento\Framework\DataObject(array(
            'nit' => $this->nit,
            'orderId' => $this->orderId
        ));
        // $this->eventManager->dispatch('vexpro_germinipay_service_cancel', ['data' => $data]);
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

        $response = $this->responseFactory->create([
            'status' => 200
        ]);

        // $response = ['success' => false];
        // try {
        //     $response = ['success' => true];
        // } catch (\Exception $e) {
        //     $response = ['success' => false, 'message' => $e->getMessage()];
        // }
        // $returnArray = json_encode($response);

        return $returnArray;
    }

}
