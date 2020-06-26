<?php
namespace Vexpro\GerminiPay\Controller\Custom;

class Mocktoken extends \Magento\Framework\App\Action\Action
{
    protected $resultJsonFactory;

    /**
     * @param \Magento\Framework\App\Action\Context $context
     */
    public function __construct(
       \Magento\Framework\App\Action\Context $context,
       \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
    )
    {
        $this->resultJsonFactory = $resultJsonFactory;
        return parent::__construct($context);
    }
    /**
     * View page action
     *
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $response = [
            'token' => 'a8gsdfinsidfg234iunsdfg'
        ];

        $resultJson = $this->resultJsonFactory->create();
        $resultJson->setData($response);
        return $resultJson->setData($response);
    }
}
