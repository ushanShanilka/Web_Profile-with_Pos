$('#btnSaveCustomer').click(function () {
    $('#CustomerTable>tr').off('click'); //detach all the tr click events

    let id = $('#customerID').val();
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let salary = $('#customerSalary').val();

    let res = saveCustomer(id, name, address, salary);
    if (res) clearCustomerTextFields();

    $('#selectCustomerID').empty();

    loadAllCustomer();
    clearCustomerTextFields();
    clickCustomerTableRow();
    getCustomerLength();
});

$('#btnGetAllCustomer').click(function () {
    loadAllCustomer();
    clearCustomerTextFields();
});

$("#customerID").on('dblclick', function () {

        alert(`Ned to Find  this Id Number : `+$('#customerID').val()+` ?`);
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#customerID").val(customer.getCustomerID());
            $("#customerName").val(customer.getCustomerName());
            $("#customerAddress").val(customer.getCustomerAddress());
            $("#customerSalary").val(customer.getCustomerSalary());
        } else {
            clearCustomerTextFields();
        }
    clickCustomerTableRow();
});

$('#btnCustomerUpdate').click(function () {
    let id = $('#customerID').val();
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let salary = $('#customerSalary').val();

    let option = confirm(`Do Toy Want to Update Customer:${id}`);
    if (option){
        let res = updateCustomer(id,name,address,salary);
        if (res){
            alert("Customer Updated");
            loadAllCustomer();
            clickCustomerTableRow();
            clearCustomerTextFields();
        }else {
            alert("Customer Updated fail");
        }
    }
});

$('#btnDeleteCustomer').click(function () {
    let id = $('#customerID').val();
    let option = confirm(`Do you want to delete Customer:${id}`);
    if (option){
        let res = deleteCustomer(id);
        if (res){
            alert("Customer Deleted !");
            loadAllCustomer();
            clickCustomerTableRow();
            clearCustomerTextFields();
        }else {
            alert("Customer Deleted Fail!");
        }
    }
});

function clickCustomerTableRow() {
    $('#CustomerTable>tr').click(function () {
        let id = $(this).children('td:eq(0)').text();
        let name = $(this).children('td:eq(1)').text();
        let address = $(this).children('td:eq(2)').text();
        let salary = $(this).children('td:eq(3)').text();

        console.log(id, name, address, salary);
        $('#customerID').val(id);
        $('#customerName').val(name);
        $('#customerAddress').val(address);
        $('#customerSalary').val(salary);
    });
}

function saveCustomer(id, name, address, salary) {
    let customer = new CustomerDTO(id, name, address, salary);
    if (CustomertxtFieldCheck(customer)) {
        if (idCheck(id)) {
            alert('Cannot Duplicate ID');
        }else {
            if (customer != null) {
                customer.setCustomerID(id);
                customer.setCustomerName(name);
                customer.setCustomerAddress(address);
                customer.setCustomerSalary(salary);

                customerDB.push(customer);
                alert("DB Ekata Giya!");
                return true;
            } else {
                alert("DB Ekata Giye Ne!")
                return false;
            }
        }
    } else {
        alert('Please fill missing details');
    }
}

function getAllCustomer () {
    return customerDB;
}

function loadAllCustomer () {
    let allCustomer = getAllCustomer();
    $('#CustomerTable').empty();
    for (var i in allCustomer) {
        let id = allCustomer[i].getCustomerID();
        let name = allCustomer[i].getCustomerName();
        let address = allCustomer[i].getCustomerAddress();
        let salary = allCustomer[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#CustomerTable').append(row);
    }
}

function searchCustomer(id) {
    for (var i in customerDB) {
        if (customerDB[i].getCustomerID() == id) return customerDB[i];
    }
    return null;
}

function updateCustomer (id,name,address,salary) {
    let customer = searchCustomer(id);
    if (customer !=null){
        customer.setCustomerName(name);
        customer.setCustomerAddress(address);
        customer.setCustomerSalary(salary);
        return true;
    }else {
        return false;
    }
}

function deleteCustomer (id) {
    let customer = searchCustomer(id);
    if (customer !=null){
        let indexNumber = customerDB.indexOf(customer);
        customerDB.splice(indexNumber,1);
        return true;
    }else {
        return false;
    }
}

function getCustomerLength(){
    $('#lblCustomerGetLength').text(`00`+customerDB.length)
}

function idCheck(id) {
    let allCustomers = getAllCustomer();
    for (let i in allCustomers) {
        if (id == allCustomers[i].getCustomerID()) {
            return true
        }else {
            return false
        }
    }
}

function CustomertxtFieldCheck(inCustomer){
    if(inCustomer.getCustomerName()!=''&&
        inCustomer.getCustomerID()!=''&&
        inCustomer.getCustomerAddress()!=''&&
        inCustomer.getCustomerSalary()!=''
    ){
        return true;
    }else {
        return false;
    }
}

//Clear All text fields and focus Customer Id text Field
function clearCustomerTextFields () {
    $('#customerID').val("");
    $('#customerName').val("");
    $('#customerAddress').val("");
    $('#customerSalary').val("");

    $('#customerID').focus();
}

//store Validation
let idRegEx = /^(C00-)[0-9]{1,3}$/;
let nameRegEx = /^[A-z]{1,}$/;
let addressRegEx = /^[A-z]{1,}\s|[A-z]{1,}$/;
let salaryRegEx = /^[0-9]{1,}$/;

//Focus fields
$('#customerID').on('keydown', function (event) {
    if (event.key == "Enter") {
        $('#customerName').focus();
    }

    let inputID=$("#customerID").val();
    if (idRegEx.test(inputID)){
        if (idCheck(inputID)){
            $("#customerID").css('border','2px solid red');
            $("#lblcusId").text('Duplicate ID '+inputID);
            $('#btnSaveCustomer').attr('disabled',false);
        }else {
            $("#customerID").css('border','2px solid blue');
            $("#lblcusId").text("");
            $("#lblcusName").text('Cus Name is a required : Minimum 5,max 20, space allowed');
            $('#btnSaveCustomer').attr('disabled',false);
        }

    }else{
        $("#customerID").css('border','2px solid red');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
        $('#btnSaveCustomer').attr('disabled',true);
    }
});

$('#customerName').on('keydown', function (event) {
    if (event.key == "Enter") {
        $('#customerAddress').focus();
    }

    let inputName=$("#customerName").val();
    if (nameRegEx.test(inputName)){
        $("#customerName").css('border','2px solid blue');
        $("#lblcusName").text("");
        $("#lblcusAddress").text('Cus Address is a required : Minimum 7');
        $('#btnCustomer').prop('enabled','false');
    }else{
        $("#customerName").css('border','2px solid red');
        $("#lblcusName").text('Your Input Data Format is Wrong');

    }
});

$('#customerAddress').on('keydown', function (event) {
    if (event.key == "Enter") {
        $('#customerSalary').focus();
    }

    let inputAddress=$("#customerAddress").val();
    if (addressRegEx.test(inputAddress)){
        $("#customerAddress").css('border','2px solid blue');
        $("#lblcusAddress").text("");
        $("#lblcusSalary").text('Cus Salary is a required  : Pattern 1000.00 or 100');

    }else{
        $("#customerAddress").css('border','2px solid red');
        $("#lblcusAddress").text('Your Input Data Format is Wrong');

    }
});

$('#customerSalary').on('keydown', function (event) {
    let inputSalary=$("#customerSalary").val();
    if (salaryRegEx.test(inputSalary)){
        $("#customerSalary").css('border','2px solid blue');
        $("#lblcusSalary").text("");
    }else{
        $("#customerSalary").css('border','2px solid red');
        $("#lblcusSalary").text('Your Input Data Format is Wrong');
    }
    if (event.key == "Enter") {
        $('#btnSaveCustomer').focus();
    }
});

$('#customerID,#customerName,#customerAddress,#customerSalary').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

