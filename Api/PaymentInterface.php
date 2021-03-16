<?php
namespace Vexpro\GerminiPay\Api;

interface PaymentInterface
{
    /**
     * @api
     * @param string nit
     * @param string orderId
     * @return string
     */
    public function getPost($nit, $orderId);

}
