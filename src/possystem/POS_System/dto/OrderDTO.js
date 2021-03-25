function OrderDTO (orderId, orderCusId, orderCusName, orderItemCode, orderItemName, orderItemUnitPrice, orderQty) {
    var __orderId = orderId;
    var __orderCusId = orderCusId;
    var __orderCusName = orderCusName;
    var __orderItemCode = orderItemCode;
    var __orderItemName = orderItemName;
    var __orderItemUnitPrice = orderItemUnitPrice;
    var __orderQty = orderQty;

    this.getOrderId = function () {
        return __orderId;
    }
    this.setOrderId = function (newOrderId) {
        __orderId = newOrderId;
    }
    this.getOrderCusId = function () {
        return __orderCusId;
    }
    this.setOrderCusId = function (newOrderCusId) {
        __orderCusId = newOrderCusId;
    }
    this.getOrderCusName = function () {
        return __orderCusName;
    }
    this.setOrderCusName = function (newOrderCusName) {
        __orderCusName = newOrderCusName
    }
    this.getOrderItemCode = function () {
        return __orderItemCode;
    }
    this.setOrderItemCode = function (newOrderItemCode) {
        __orderItemCode = newOrderItemCode;
    }
    this.getOrderItemName = function () {
        return __orderItemName;
    }
    this.setOrderItemName = function (newOrderItmName) {
        __orderItemName = newOrderItmName;
    }
    this.getOrderItemUnitPrice = function () {
        return __orderItemUnitPrice;
    }
    this.setOrderItemUnitPrice = function (newOrderItemUnitPrice) {
        __orderItemUnitPrice = newOrderItemUnitPrice
    }
    this.getOrderItemQty = function () {
        return __orderQty
    }
    this.setOrderItemQty = function (newOrderItemQty) {
        __orderQty = newOrderItemQty;
    }
}