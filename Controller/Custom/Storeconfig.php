<?php
namespace Vexpro\GerminiPay\Controller\Custom;

class Storeconfig extends \Magento\Framework\App\Action\Action
{
    protected $resultJsonFactory;
 
    protected $storeManager;
 
    protected $scopeConfig;
 
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Customer\Model\Session $customerSession
    ) {
        $this->resultJsonFactory = $resultJsonFactory;
        $this->storeManager = $storeManager;
        $this->scopeConfig = $scopeConfig;
        $this->customerSession = $customerSession;
        parent::__construct($context);
    }
 
    /**
     * Execute view action
     *
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $response = [];
        try {
            $configValue = $this->scopeConfig->getValue(
                'payment/Vexpro_GerminiPay/parcelas',
                \Magento\Store\Model\ScopeInterface::SCOPE_STORE
            );
            
            $merchant_id = $this->scopeConfig->getValue(
                'payment/Vexpro_GerminiPay/merchant_id',
                \Magento\Store\Model\ScopeInterface::SCOPE_STORE
            );

            $merchant_key = $this->scopeConfig->getValue(
                'payment/Vexpro_GerminiPay/merchant_key',
                \Magento\Store\Model\ScopeInterface::SCOPE_STORE
            );

            $esitef_url = $this->scopeConfig->getValue(
                'payment/Vexpro_GerminiPay/esitef_url',
                \Magento\Store\Model\ScopeInterface::SCOPE_STORE
            );

            $response = [
                'success' => true,
                'value' => __($configValue),
                'merchant_id' => $merchant_id,
                'merchant_key' => $merchant_key,
                'esitef_url' => $esitef_url
            ];
 
        } catch (\Exception $e) {
            $response = [
                'success' => false,
                'value' => __($e->getMessage())
            ];
            $this->messageManager->addError($e->getMessage());
        }
        $resultJson = $this->resultJsonFactory->create();
        return $resultJson->setData($response);
    }
}
