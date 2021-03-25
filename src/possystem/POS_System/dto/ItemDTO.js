function ItemDTO (code, name, qty, unitprice) {
    var __code = code;
    var __name = name;
    var __qty = qty;
    var __unitprice = unitprice;

    this.getItemCode = function () {
        return __code;
    }
    this.setItemCode = function (newCode) {
        __id = newCode;
    }

    this.getItemName = function () {
        return __name;
    }
    this.setItmName = function (newName) {
        __name = newName;
    }
    this.getItemQty = function () {
        return __qty;
    }
    this.setItemQty = function (newQty) {
        __qty = newQty
    }
    this.getItemUnitPrice = function () {
        return __unitprice;
    }
    this.setItemUnitPrice = function (newUnitPrice) {
        __unitprice = newUnitPrice;
    }
}


