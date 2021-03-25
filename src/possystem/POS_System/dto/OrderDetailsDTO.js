function OrderDetailsDTO (orderId, orderDate, orderCusId,orderItemCode, orderQty) {
    var __orderId = orderId;
    var __orderDate = orderDate;
    var __orderCusId = orderCusId;
    var __orderItemCode = orderItemCode;
    var __orderQty = orderQty;

    this.getOrderId = function () {
        return __orderId;
    }
    this.setOrderId = function (newOrderId) {
        __orderId = newOrderId;
    }
    this.getOrderDate = function () {
        return __orderDate;
    }
    this.setOrderDate = function (newOrderDate) {
        __orderDate = newOrderDate;
    }
    this.getOrderCusId = function () {
        return __orderCusId;
    }
    this.setOrderCusId = function (newOrderCusId) {
        __orderCusId = newOrderCusId;
    }
    this.getOrderItemCode = function () {
        return __orderItemCode;
    }
    this.setOrderItemCode = function (newOrderItemCode) {
        __orderItemCode = newOrderItemCode;
    }
    this.getOrderQty = function () {
        return __orderQty;
    }
    this.setOrderQty = function (newOrderQty) {
        __orderQty = newOrderQty;
    }
}