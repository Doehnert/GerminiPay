<?php
namespace Vexpro\GerminiPay\Model\Session;

class Storage extends \Magento\Framework\Session\Storage
{
    public function __construct(
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        $namespace = 'mysession',
        array $data = []
    ) {
        parent::__construct($namespace, $data);
    }
}
