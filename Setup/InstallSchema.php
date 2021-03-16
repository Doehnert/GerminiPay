<?php

namespace Vexpro\GerminiPay\Setup;

use Magento\Framework\DB\Ddl\Table;
use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;

class InstallSchema implements InstallSchemaInterface
{
    const SITEF_USN = 'sitef_usn';
    const SITEF_TOKEN = 'sitef_token';
    const SITEF_NIT = 'sitef_nit';

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

        $setup->getConnection()->addColumn(
            $setup->getTable('sales_order'),
            self::SITEF_TOKEN,
            [
                'type' => Table::TYPE_TEXT,
                'size' => 255,
                'nullable' => true,
                'comment' => 'Token de armazenamento REST e-SiTef'
            ]
        );

        $setup->getConnection()->addColumn(
            $setup->getTable('sales_order'),
            self::SITEF_NIT,
            [
                'type' => Table::TYPE_TEXT,
                'size' => 255,
                'nullable' => true,
                'comment' => 'Nit usado para cancelamento'
            ]
        );

        $setup->endSetup();

    }
}
