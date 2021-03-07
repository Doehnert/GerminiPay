<?php

namespace Vexpro\GerminiPay\Setup;

use Magento\Framework\DB\Ddl\Table;
use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;

class InstallSchema implements InstallSchemaInterface
{

    const SITEF_USN = 'sitef_usn';
    public function install(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();
        $setup->getConnection()->addColumn(
            $setup->getTable('sales_order'),
            self::SITEF_USN,
            [
                'type' => Table::TYPE_TEXT,
                'size' => 255,
                'nullable' => true,
                'comment' => 'Numero nota fiscal'
            ]
        );
        $setup->endSetup();
    }
}
