<?php

namespace Vexpro\GerminiPay\Setup;

use Magento\Framework\DB\Ddl\Table;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\UpgradeDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;

/**
 * @codeCoverageIgnore
 */
class UpgradeData implements UpgradeDataInterface

{
    private $eavSetupFactory;

    const TRACKING_CODE = 'tracking_code';
    const PAYMENT_CODE = 'payment_code';
    const PAYMENT_TYPE = 'payment_type';

    public function __construct(
        EavSetupFactory $eavSetupFactory
    ) {
        $this->eavSetupFactory = $eavSetupFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();
        $setup->getConnection()->addColumn(
            $setup->getTable('sales_order'),
            self::TRACKING_CODE,
            [
                'type' => Table::TYPE_TEXT,
                'size' => 255,
                'nullable' => true,
                'comment' => 'trackingCode'
            ]
        );

        $setup->getConnection()->addColumn(
            $setup->getTable('sales_order'),
            self::PAYMENT_CODE,
            [
                'type' => Table::TYPE_TEXT,
                'size' => 255,
                'nullable' => true,
                'comment' => 'Code for digital payment'
            ]
        );

        $setup->getConnection()->addColumn(
            $setup->getTable('sales_order'),
            self::PAYMENT_TYPE,
            [
                'type' => Table::TYPE_TEXT,
                'size' => 255,
                'nullable' => true,
                'comment' => 'paymentType: 1-seed 2-digitalWallet'
            ]
        );

        $setup->endSetup();
    }
}
