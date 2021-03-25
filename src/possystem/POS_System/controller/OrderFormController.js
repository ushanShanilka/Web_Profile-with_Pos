//Get All Customer---------------------------------------------------------
$('#btnOrder').click( function () {
    loadAllCustomerId();
});
$('#selectCustomerID').click(function () {
    let Ocustomer = searchCustomer($(this).val());
    if (Ocustomer != null) {
        $("#selectCustomerID").val(Ocustomer.getCustomerID());
        $("#orderCusName").val(Ocustomer.getCustomerName());
    }
});
function getAllCustomerId () {
    return customerDB;
}
function loadAllCustomerId () {
    let allCustomer = getAllCustomerId();

    for (var i in allCustomer) {
        let id = allCustomer[i].getCustomerID();
        $('#selectCustomerID').append("<option>"+id+"</option>");
    }
}

//Get All Items---------------------------------------------------------
$('#selectItemCode').on('dblclick', function () {
    loadAllItemCode();
});
function getAllItemCode () {
    return itemDB;
}
function loadAllItemCode () {
    let allItem = getAllItemCode();
    for (var i in allItem) {
        let code = allItem[i].getItemCode();

        $('#selectItemCode').append("<option>"+code+ "</option>");
    }
}
$('#selectItemCode').click(function () {
    let Oitem = searchItem($(this).val());
    if (Oitem != null) {
        $("#selectItemCode").val(Oitem.getItemCode());
        $("#orderItemName").val(Oitem.getItemName());
        $("#orderItemUnitPrice").val(Oitem.getItemUnitPrice());
        $("#oitemQty").val(Oitem.getItemQty());

    } else {
    }
});

//Add Table-------------------------------------------
$('#btnOrderAdd').click(function () {
    /*$('#selectCustomerID').off('dblclick');*/
    let orderId = $("#orderID").val();
    let orderCusId = $("#selectCustomerID").val();
    let orderCusName = $("#orderCusName").val();
    let orderItemCode = $("#selectItemCode").val();
    let orderItemName = $("#orderItemName").val();
    let orderItemUnitPrice = $("#orderItemUnitPrice").val();
    let orderQty = $("#orderQty").val();

        if (idCheck(orderId)) {
            alert('Cannot Duplicate Order Id ' + orderId);
        } else {
            let row = `<tr><td>${orderId}</td><td>${orderCusId}</td><td>${orderCusName}</td><td>${orderItemCode}</td><td>${orderItemName}</td><td>${orderItemUnitPrice}</td><td>${orderQty}</td></tr>`;
            $("#OrderTable").append(row);
            getAllCustomerId();
            updateItem();
            generateTotal();

            //Remove from Table--------------------------------------------------
            $("#OrderTable>tr").on('dblclick' , function () {
                confirm("You Want Remove this ?");
                $(this).remove();
            });
            //-------------------------------------------------------------------
            clickOrderTableRow();
            clearOrderTextFields();
        }
});

//Place Order--------------------------------------------------------
$('#btnPlaceOrder').click(function () {
    let orderId =$('#OrderTable>tr').children('td:eq(0)').text();
    let orderCusId =$('#OrderTable>tr').children('td:eq(1)').text();
    let orderCusName =$('#OrderTable>tr').children('td:eq(2)').text();
    let orderItemCode =$('#OrderTable>tr').children('td:eq(3)').text();
    let orderItemName =$('#OrderTable>tr').children('td:eq(4)').text();
    let orderItemUnitPrice =$('#OrderTable>tr').children('td:eq(5)').text();
    let orderQty =$('#OrderTable>tr').children('td:eq(6)').text();

    let orderDate = $('#orderDate').val();
    alert(orderId)

    saveOrder(orderId, orderCusId, orderCusName, orderItemCode, orderItemName, orderItemUnitPrice, orderQty);

    getOrderLength();
    saveOrderDetails(orderId, orderDate, orderCusId,orderItemCode, orderQty);
    // updateItemQty();
    genatareOID();
    $('#lblTotal').text('Total Rs.');
});
/*function updateItemQty (code, qty) {
    let item = searchItem(code);
    if (item != null){
        item.setItemQty(qty)
    }
}*/
function getOrderLength(){
    $('#lblOrderGetLength').text(`00`+orderDB.length)
}

function saveOrderDetails (orderId, orderDate, orderCusId, orderItemCode, orderQty) {
    let orderDetails = new OrderDetailsDTO(orderId, orderDate, orderCusId,orderItemCode, orderQty);
        if (orderDetails != null){
            orderDetails.setOrderId(orderId);
            orderDetails.setOrderDate(orderDate);
            orderDetails.setOrderCusId(orderCusId);
            orderDetails.setOrderItemCode(orderItemCode);
            orderDetails.setOrderQty(orderQty);

            orderDetailsDB.push(orderDetails);
            alert("OrderDetails Ekatath Giya");
        }else {
            alert("Yanna ne")
        }

}

function saveOrder(orderId, orderCusId, orderCusName, orderItemCode, orderItemName, orderItemUnitPrice, orderQty){
    let order = new OrderDTO(orderId, orderCusId, orderCusName, orderItemCode, orderItemName, orderItemUnitPrice, orderQty);
    if (order !=null){
        order.setOrderId(orderId);
        order.setOrderCusId(orderCusId);
        order.setOrderCusName(orderCusName);
        order.setOrderItemCode(orderItemCode);
        order.setOrderItemName(orderItemName);
        order.setOrderItemUnitPrice(orderItemUnitPrice);
        order.setOrderItemQty(orderQty);

        orderDB.push(order);
        alert("Badu giya")
        $('#OrderTable').empty();
    }else {
        alert("Yanna ne")
    }
    clickOrderTableRow();
}

//Search Order-------------------------------------------------------
function searchOrder(id){
    for (var i in orderDB) {
        if (orderDB[i].getOrderId() == id) return orderDB[i];
    }
    return null;
}
$('#orderID').on('dblclick',function () {
    alert(`Ned to Find  this OrderId Number : `+$('#orderID').val()+` ?`);
    let order = searchOrder($(this).val());
    if (order != null){
        $("#orderID").val(order.getOrderId());
        $("#selectCustomerID").val(order.getOrderCusId());
        $("#orderCusName").val(order.getOrderCusName());
        $("#selectItemCode").val(order.getOrderItemCode());
        $("#orderItemName").val(order.getOrderItemName());
        $("#orderItemUnitPrice").val(order.getOrderItemUnitPrice());
        $("#orderQty").val(order.getOrderItemQty());
    }else {
        clearOrderTextFields();
    }
})

//generateTotal------------------------------------------------------
$('#lblTotal').text('Total Rs.');
function generateTotal(){
    let tot = $('#orderItemUnitPrice').val() * $('#orderQty').val();
    $('#lblTotal').text(`Total Rs. ${tot}.00`);
}

//clearOrderTextFields-----------------------------------------------
$('#btnClear').click(function () {
    clearOrderTextFields();
})
function clearOrderTextFields () {
    $('#orderID').val("");
    $('#selectCustomerID').val("");
    $('#orderCusName').val("");
    $('#selectItemCode').val("");
    $('#orderItemName').val("");
    $('#orderItemUnitPrice').val("");
    $('#oitemQty').val("");
    $('#orderQty').val("");

    $('#orderID').focus();
}

//Search Orders------------------------------------------------------
$('#orderID').on('dblclick',function () {

    alert('Ned to Find  this Order Id  : '+$('#orderID').val()+ ` ?`);
    let order = searchOrder($(this).val());
    if (order != null){
        $("#orderID").val(order.getOrderId());
        $('#selectCustomerID').val(order.getOrderCusId());
        $('#orderCusName').val(order.getOrderCusName());
        $('#selectItemCode').val(order.getOrderItemCode());
        $('#orderItemName').val(order.getOrderItemName());
        $('#orderItemUnitPrice').val(order.getOrderItemUnitPrice());
        $('#orderQty').val(order.getOrderItemQty());
    }else {
        clearOrderTextFields();
        alert('Ehema Ekek Neee');
    }
});
function searchOrder(oid) {
    for (var i in orderDB) {
        if (orderDB[i].getOrderId() == oid) return orderDB[i];
    }
    return null;
}

function clickOrderTableRow(){
    $('#OrderTable>tr').click(function(){
        let oid =$(this).children('td:eq(0)').text();
        let oCusid =$(this).children('td:eq(1)').text();
        let oCusName =$(this).children('td:eq(2)').text();
        let oItemCode =$(this).children('td:eq(3)').text();
        let oItemName =$(this).children('td:eq(4)').text();
        let oItemUnitPrice =$(this).children('td:eq(5)').text();
        let oQty =$(this).children('td:eq(6)').text();



        $('#orderID').val(oid);
        $('#selectCustomerID').val(oCusid);
        $('#orderCusName').val(oCusName);
        $('#selectItemCode').val(oItemCode);
        $('#orderItemName').val(oItemName);
        $('#orderItemUnitPrice').val(oItemUnitPrice);
        $('#orderQty').val(oQty);
        console.log(oid)
    });
}
//RegEx and focus----------------------------------------------------
let orderIdRegEx = /^(O00-)[0-9]{1,3}$/;
let orderCusId = /^(C00-)[0-9]{1,3}$/;
let orderItemCode = /^(I00-)[0-9]{1,3}$/;
let orderQtyRegEx = /^[0-9]{1,}$/;

$('#orderID').on('keydown',function (event) {
    $("#lblOrderId").text('OrderId is a required  : (O00-001)');
    if (event.key == "Enter"){
        $('#selectCustomerID').focus();
    }

    let inputId=$('#orderID').val();
    if (orderIdRegEx.test(inputId)){
    if (oidCheck()){
        console.log(inputId)
        $('#orderID').css('border', '2px solid red');
        $("#lblOrderId").text('Duplicate Order ID '+inputId);
    }else {
        $('#orderID').css('border', '2px solid blue');
        $("#lblOrderId").text("");
    }
    }else {
        $('#orderID').css('border', '2px solid red');
        $("#lblOrderId").text('Your Input Data Format is Wrong (O00-001)');
    }
});

$('#selectCustomerID').click(function () {
    let selectCusId=$('#selectCustomerID').val();
    if (orderCusId.test(selectCusId)){
        console.log(selectCusId)
        $('#orderCusName').css('border', '2px solid blue');
        $('#selectCustomerID').css('border', '2px solid blue');
        $("#lblSelectCusId").text("");
    }else {
        $('#selectCustomerID').css('border', '2px solid red');
        $("#lblSelectCusId").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$('#selectItemCode').click(function () {
    let selectItemCode=$('#selectItemCode').val();
    if (orderItemCode.test(selectItemCode)){
        $('#selectItemCode').css('border', '2px solid blue');
        $('#orderItemName').css('border', '2px solid blue');
        $('#orderItemUnitPrice').css('border', '2px solid blue');
        $('#oitemQty').css('border', '2px solid blue');
        $("#lblSelectItemCode").text("");
    }else {
        $('#selectItemCode').css('border', '2px solid red');
        $("#lblSelectItemCode").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$('#selectCustomerID').on('keydown',function (event) {
    if (event.key == "Enter"){
        $('#selectItemCode').focus();
    }
});

$('#selectItemCode').on('keydown',function (event) {
    if (event.key == "Enter"){
        $('#orderQty').focus();
        $("#lblOrderQty").text('Enter a Lower Number  than the Current Stocks.');
    }

});

$('#orderQty').on('keydown',function (event) {

    let oQty = $('#orderQty').val();
    let iQty = $('#oitemQty').val();
    if (event.key == "Enter"){
        if (qtyRegEx.test(oQty)){
            if (oQty <= iQty){
                $('#lblOrderQty').css('colour', '2px solid blue');
                $("#lblOrderQty").text('Not a Problem');
                $('#btnOrderAdd').focus();
                let crunt =  $('#oitemQty').val()-$('#orderQty').val();
                $('#oitemQty').val(crunt)
            }else {
                $("#lblOrderQty").text('Error! Enter a Lower Number  than the Current Stocks.');
            }
        }else {
            $('#lblOrderQty').css('colour', '2px solid red');
            $("#lblOrderQty").text('Your Input Data Format is Wrong');
        }

    }
});
//-------------------------------------------------------------------
function genatareOID() {
    let LastId = orderDB[orderDB.length - 1].getOrderId();
    $('#orderID').val('O00-00' + (parseInt(LastId.split('O00-00')[1]) + 1));
    console.log((parseInt(LastId.split('O00-00')[1]) + 1));
}

function oidCheck(oid) {
    let allOrders = getAllOrderDetails();
    for (let i in allOrders) {
        if(allOrders[i].getOrderId()==oid){
            return true;
        }else{
            return false;
        }
    }
}









