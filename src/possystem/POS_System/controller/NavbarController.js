
var Home = document.getElementById("Home");


var Item = document.getElementById("Item");
Item.style.display='none';

var Customer = document.getElementById("Customer");
Customer.style.display='none';

var Order = document.getElementById("Order");
Order.style.display='none';

var OrderDetails = document.getElementById("OrderDetails");
OrderDetails.style.display='none';

var btnHome = document.getElementById("btnHome");
btnHome.addEventListener('click',function () {
    Home.style.display='block';
    Item.style.display = 'none';
    Order.style.display='none';
    Customer.style.display='none';
    OrderDetails.style.display = 'none';
});

var btnItem = document.getElementById("btnItem");
btnItem.addEventListener('click',function () {
    Home.style.display = 'none';
    Item.style.display = 'block';
    Order.style.display='none';
    Customer.style.display='none';
    OrderDetails.style.display = 'none';
});

var btnCustomer = document.getElementById("btnCustomer");
btnCustomer.addEventListener('click',function () {
    Home.style.display = 'none';
    Item.style.display = 'none';
    Customer.style.display = 'block';
    Order.style.display='none';
    OrderDetails.style.display = 'none';
    $('#customerID').focus();
});

var btnGetStared = document.getElementById("btnGetStared");
btnGetStared.addEventListener('click',function () {
    Home.style.display='none';
    Customer.style.display= 'block';
    Item.style.display = 'none';
    OrderDetails.style.display = 'none';
    $('#customerID').focus();
});

var btnOrder = document.getElementById("btnOrder");
btnOrder.addEventListener('click',function () {
    Home.style.display='none';
    Customer.style.display= 'none';
    Item.style.display = 'none';
    Order.style.display = 'block';
    OrderDetails.style.display = 'none';
});

var btnOrderDetails = document.getElementById("btnOrderDetails");
btnOrderDetails.addEventListener('click',function () {
    Home.style.display='none';
    Customer.style.display= 'none';
    Item.style.display = 'none';
    Order.style.display = 'none';
    OrderDetails.style.display = 'block';
});