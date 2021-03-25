
$('#btnGetAllOrderDetails').click(function () {
    loadAllOrderDetails ();
    getOrderDetailsLength();
});
function getOrderDetailsLength(){
    $('#lblorderDetailsGetLength').text(`00`+orderDetailsDB.length)
}

function getAllOrderDetails () {
    return orderDetailsDB;
}
function loadAllOrderDetails () {
    let allOrderDetails = getAllOrderDetails();
    $('#OrderDetailsTable').empty();
    for (var i in allOrderDetails){
        let orderId = allOrderDetails[i].getOrderId();
        let orderDate = allOrderDetails[i].getOrderDate();
        let orderCusId = allOrderDetails[i].getOrderCusId();
        let orderItemCode = allOrderDetails[i].getOrderItemCode();
        let orderQty = allOrderDetails[i].getOrderQty();

        var row = `<tr><td>${orderId}</td><td>${orderDate}</td><td>${orderCusId}</td><td>${orderItemCode}</td><td>${orderQty}</td></tr>`;
        $('#OrderDetailsTable').append(row);
    }
}

