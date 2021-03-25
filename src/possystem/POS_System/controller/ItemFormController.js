$('#btnItemSave').click(function () {

    $('#ItemTable>tr').off('click')

    let code=$('#itemCode').val();
    let name=$('#itemName').val();
    let qty=$('#itemQty').val();
    let unitprice=$('#itemunitPrice').val();

    let res = saveItem(code, name, qty, unitprice);
    if (res) clearItemTextFields();

    loadAllItem();
    clearItemTextFields();
    clickItemTableRow();
    getItemLength();
});
function getItemLength(){
    $('#lblItemGetLength').text(`00`+itemDB.length)
}

$('#btnGetAllItem').click(function () {
    loadAllItem();
});

$('#itemCode').on('keyup',function (eObj) {
    if (eObj.key == "Shift"){
        alert(`Ned to Find  this Itm Code : `+$('#itemCode').val()+` ?`);
        let item = searchItem($(this).val());
        if (item != null){
            $('#itemCode').val(item.getItemCode());
            $('#itemName').val(item.getItemName());
            $('#itemQty').val(item.getItemQty());
            $('#itemunitPrice').val(item.getItemUnitPrice());
        }else {
            clearItemTextFields();
        }
    }
    clickItemTableRow();
    $('#selectItemCode').empty();

});

$('#btnUpdateItem').click(function () {
    let code = $('#itemCode').val();
    let name = $('#itemName').val();
    let qty = $('#itemQty').val();
    let unitprice = $('#itemunitPrice').val();

    let option = confirm(`Do Toy Want to Update Item:${code}`);
    if (option){
        let res = updateItem(code, name, qty, unitprice);
        if (res){
            alert("Item Updated");
            loadAllItem();
            clickItemTableRow();
            clearItemTextFields();
        }else {
            alert("Item Updated Fail");
        }
    }
});

$('#btnDeleteItem').click(function () {
    let code = $('#itemCode').val();
    let option = confirm(`Do you want to delete Item:${code}`);
    if (option){
        let res = deleteItem(code);
        if (res){
            alert("Item Deleted !");
        }else {
            alert("Item Deleted !");
        }
    }
    loadAllItem();
    clearItemTextFields();
    clickItemTableRow();
});

function deleteItem (code) {
    let item =searchItem(code);
    if (item != null){
        let indexNumber = itemDB.indexOf(item);
        itemDB.splice(indexNumber,1);
        return true;
    }else {
        return false;
    }
}

function updateItem (code, name, qty, unitprice) {
    let item = searchItem(code);
    if (item != null){
        item.setItemCode(code);
        item.setItmName(name);
        item.setItemQty(qty);
        item.setItemUnitPrice(unitprice);
        return true;
    }else {
        return false
    }
}

function clearItemTextFields() {
    $('#itemCode').val("");
    $('#itemName').val("");
    $('#itemQty').val("");
    $('#itemunitPrice').val("");

    $('#customerID').focus();
}

function searchItem (code) {
    for (var i in itemDB){
        if (itemDB[i].getItemCode() == code) return itemDB[i];
    }
    return null;
}

function saveItem ( code, name, qty, unitprice ) {
    let item = new ItemDTO(code, name, qty, unitprice);
    if (ItemtxtFieldCheck(item)) {
        if (codeCheck(code)) {
            alert('Cannot Duplicate Code ' + $('#orderID').val());
        } else {
            if (item != null) {
                item.setItemCode(code);
                item.setItmName(name);
                item.setItemQty(qty);
                item.setItemUnitPrice(unitprice);

                itemDB.push(item);
                alert("Badu Giya !");
                loadAllItem();
                return true;
            } else {
                alert("Badu Giye ne !");
                return false;
            }
        }
    }else {
        alert('Please fill missing details');
    }
}

function getAllItem () {
    return itemDB;
}

function loadAllItem() {
    let allItem = getAllItem();
    $('#ItemTable').empty();
    for (var i in allItem){
        let code = allItem[i].getItemCode();
        let name = allItem[i].getItemName();
        let qty = allItem[i].getItemQty();
        let unitprice = allItem[i].getItemUnitPrice();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>Rs. ${unitprice}.00</td></tr>`;
        $('#ItemTable').append(row);
    }
}

function codeCheck(code) {
    let allItem = getAllItem();
    for (let i in allItem) {
        if(allItem[i].getItemCode()==code){
            return true;
        }else{
            return false;
        }
    }
}

function ItemtxtFieldCheck(inItem){
    if(inItem.getItemCode()!=''&&
        inItem.getItemName()!=''&&
        inItem.getItemUnitPrice()!=''&&
        inItem.getItemQty()!=''
    ){
        return true;
    }else {
        return false;
    }
}

function clickItemTableRow () {
    $('#ItemTable>tr').click(function(){
        let code =$(this).children('td:eq(0)').text();
        let name =$(this).children('td:eq(1)').text();
        let qty =$(this).children('td:eq(2)').text();
        let unitprice =$(this).children('td:eq(3)').text();


        console.log(code,name,qty,unitprice);
        $('#itemCode').val(code);
        $('#itemName').val(name);
        $('#itemQty').val(qty);
        $('#itemunitPrice').val(unitprice);
    });
}
 let codeRegEx = /^(I00-)[0-9]{1,3}$/;
 let InameRegEx = /^[A-z]{1,}[ ][A-z]{1,}$/;
 let qtyRegEx = /^[0-9]{1,}$/;
 let unitpriceRegEx = /^[0-9]{1,}$/;

$('#itemCode').on('keydown',function (event) {
    if (event.key == "Enter"){
        $('#itemName').focus();
    }

    let inputCode=$('#itemCode').val();
    if (codeRegEx.test(inputCode)){
        if (codeCheck(inputCode)){
            $('#itemCode').css('border', '2px solid red');
            $("#lblIcode").text('Duplicate Code '+ inputCode);
        }else {
            $('#itemCode').css('border', '2px solid blue');
            $("#lblIcode").text("");
            $("#lblIname").text('Item Name is a required field : Minimum 5,max 20');
        }
    }else {
        $('#itemCode').css('border', '2px solid red');
        $("#lblIcode").text('Your Input Data Format is Wrong (I00-001)');
    }
});

$('#itemName').on('keydown',function (event) {
    if (event.key == "Enter"){
        $('#itemQty').focus();
    }
    let inputName=$('#itemName').val();
    if (InameRegEx.test(inputName)){
        $('#itemName').css('border', '2px solid blue');
        $("#lblIname").text("");
        $("#lblIqty").text('Item Qty is a required field : Minimum 5,max 20');
    }else {
        $('#itemName').css('border', '2px solid red');
        $("#lblIname").text('Your Input Data Format is Wrong');
    }
});

$('#itemQty').on('keydown',function (event) {
    if (event.key == "Enter"){
        $('#itemunitPrice').focus();
    }

    let inputQty=$('#itemQty').val();
    if (qtyRegEx.test(inputQty)){
        $('#itemQty').css('border', '2px solid blue');
        $("#lblIqty").text("");
        $("#lblIunitprice").text('Item UnitPrice is a required field : Pattern 1000.00 or 100');
    }else {
        $('#itemQty').css('border', '2px solid red');
        $("#lblIqty").text('Your Input Data Format is Wrong');
    }
});

$('#itemunitPrice').on('keydown',function (event) {
    if (event.key == "Enter"){
        $('#btnItemSave').focus();
    }

    let inputUnitPrice=$('#itemunitPrice').val();
    if (unitpriceRegEx.test(inputUnitPrice)){
        $('#itemunitPrice').css('border', '2px solid blue');
        $("#lblIunitprice").text("");
    }else {
        $('#itemunitPrice').css('border', '2px solid red');
        $("#lblIunitprice").text('Your Input Data Format is Wrong (1500)');
    }
});



$('#itemCode,#itemName,#itemQty,#itemunitPrice').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
})