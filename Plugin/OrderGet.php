<?php

namespace Vexpro\GerminiPay\Plugin;

use Magento\Sales\Api\Data\OrderExtensionFactory;
use Magento\Sales\Api\Data\OrderExtensionInterface;
use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\Data\OrderSearchResultInterface;
use Magento\Sales\Api\OrderRepositoryInterface;

class OrderGet
{
    /**
     * Order feedback field name
     */
    const SITEF_USN = 'sitef_usn';
    const SITEF_TOKEN = 'sitef_token';

    /**
     * Order Extension Attributes Factory
     *
     * @var OrderExtensionFactory
     */
    protected $extensionFactory;

    /**
     * OrderRepositoryPlugin constructor
     *
     * @param OrderExtensionFactory $extensionFactory
     */
    public function __construct(OrderExtensionFactory $extensionFactory)
    {
        $this->extensionFactory = $extensionFactory;
    }

    /**
     * Add "customer_feedback" extension attribute to order data object to make it accessible in API data
     *
     * @param OrderRepositoryInterface $subject
     * @param OrderInterface $order
     *
     * @return OrderInterface
     */
    public function afterGet(OrderRepositoryInterface $subject, OrderInterface $order)
    {
        $sitefUsn = $order->getData(self::SITEF_USN);
        $sitefToken = $order->getData(self::SITEF_TOKEN);
        $extensionAttributes = $order->getExtensionAttributes();
        $extensionAttributes = $extensionAttributes ? $extensionAttributes : $this->extensionFactory->create();
        $extensionAttributes->setSitefUsn($sitefUsn);
        $extensionAttributes->setSitefToken($sitefToken);
        $order->setExtensionAttributes($extensionAttributes);

        return $order;
    }

    /**
     * Add "customer_feedback" extension attribute to order data object to make it accessible in API data
     *
     * @param OrderRepositoryInterface $subject
     * @param OrderSearchResultInterface $searchResult
     *
     * @return OrderSearchResultInterface
     */
    public function afterGetList(OrderRepositoryInterface $subject, OrderSearchResultInterface $searchResult)
    {
        $orders = $searchResult->getItems();

        foreach ($orders as &$order) {
            $sitefUsn = $order->getData(self::SITEF_USN);
            $sitefToken = $order->getData(self::SITEF_TOKEN);
            $extensionAttributes = $order->getExtensionAttributes();
            $extensionAttributes = $extensionAttributes ? $extensionAttributes : $this->extensionFactory->create();
            $extensionAttributes->setSitefUsn($sitefUsn);
            $extensionAttributes->setSitefToken($sitefToken);
            $order->setExtensionAttributes($extensionAttributes);
        }

        return $searchResult;
    }

    /**
     * @param CartRepositoryInterface $subject
     * @param CartInterface $result
     * @return array
     */
    public function beforeSave(
        OrderRepositoryInterface $subject,
        OrderInterface $quote
    ) {
        $extensionAttributes = $quote->getExtensionAttributes() ?: $this->extensionFactory->create();
        if ($extensionAttributes !== null && $extensionAttributes->getSitefUsn() !== null) {
            $quote->setSitefUsn($extensionAttributes->getSitefUsn());
            $quote->setSitefToken($extensionAttributes->getSitefToken());
        }

        return [$quote];
    }
}
