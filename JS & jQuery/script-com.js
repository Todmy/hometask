//if(typeof localStorage["objArr"] === "string"){
//    var objArray = JSON.parse(localStorage["objArr"]);
//} else {
//    var objArray = [
//        {
//            title: "product 1",
//            sku: "sku1",
//            price: "10"
//        },
//        {
//            title: "product 2",
//            sku: "sku2",
//            price: "20"
//        },
//        {
//            title: "product 3",
//            sku: "sku3",
//            price: "13"
//        },
//        {
//            title: "product 4",
//            sku: "sku4",
//            price: "15"
//        }
//    ]; //array of objects which fill in the table
//    localStorage["objArr"] = JSON.stringify(objArray);
//}
////delete  localStorage["objArr"];
//
//var buttonEdit = formButtonClosure('edit'),
//    buttonDelete = formButtonClosure('delete'),
//    buttonAdd = formButtonClosure('add'),
//    buttonJSON = formButtonClosure('to-JSON');
//
//function formHead(object) { //create a table head
//    var head = document.createElement("tr");
//    for (var key in object)head.innerHTML += '<th>' + key + '</th>';
//    head.innerHTML += '<th> Actions </th>';
//    return head;
//}
//function formButtonClosure(type) { //create a button
//    return function () {
//        var button = document.createElement("button");
//        //button.name = type;
//        button.className = type;
//        button.innerHTML = type;
//        return button;
//    };
//
//}
//function formRow(dataRow) { //create a single row for table
//    var row = document.createElement("tr");
//    for (var key in dataRow) row.innerHTML += '<td>' + dataRow[key] + '</td>';
//    var tdActions = document.createElement("td");
//    tdActions.appendChild(buttonEdit());
//    tdActions.appendChild(buttonDelete());
//    row.appendChild(tdActions);
//    return row;
//}
//function createTable(data) { //create a new table element
//    var table = document.createElement("table");
//    table.appendChild(formHead(data[0]));
//    for (var i = 0; i < data.length; i++) table.appendChild(formRow(data[i]));
//    $(table).addClass("data")
//    return table;
//}
//
//$("body").append(createTable(objArray)).append(buttonAdd()).append(buttonJSON());
//
//// attach events to buttons
//
//$("button.to-JSON").bind("click", function () {//write the list of objects to console
//    console.log(localStorage["objArr"])
//});
//function findElem(key, value) {
//    for (var i = 0; i < objArray.length; i++) {
//        if (objArray[i][key] === value) return objArray[i];
//    }
//}
//function removeArrElem(key, value) {
//    for (var i = 0; i < objArray.length; i++) {
//        if (objArray[i][key] === value) {
//            objArray.splice(i, 1);
//            //localStorage.setItem("objArr", objArray);
//            return;
//        }
//    }
//}
//$("table button.delete").bind("click", function () {
//    var delElemSku = $(this).parent().parent().children()[1].innerHTML;
//    var question = confirm("Do you watn delete element with sku '" + delElemSku + "'?");
//    if (question) {
//        $(this).parent().parent().remove();
//        removeArrElem("sku", delElemSku);
//    }
//});
//$("table button.edit").bind("click", function () {
//    $("#product").addClass("visible").append(buttonEdit);
//    $("#class-wrapper").addClass("visible");
//    var editElemSku = $(this).parent().parent().children()[1].innerHTML;
//    var editElem = findElem("sku", editElemSku);
//    $("#product").find("input")[0].value = editElem["title"];
//    $("#product").find("input")[1].value = editElem["sku"];
//    $("#product").find("input")[2].value = editElem["price"];
//
//    //localStorage.setItem("objArr", objArray);
//});
//$("body button.add").bind("click", function () {
//    $("#product").addClass("visible").append(buttonAdd);
//    $("#class-wrapper").addClass("visible");
//    var inputs = $("#product").find("input");
//    for (var i = 0; i < inputs.length; i++)inputs[i].value = "";
//});
//function manualClosing() {
//    $("#product").removeClass("visible");
//    $("#class-wrapper").removeClass("visible");
//}
//$("#product").bind("submit", function (event) {
//    var elemSimular = findElem("sku", this.sku.value);
//    if (elemSimular && this[3].className === "add") {
//        alert("DataBase already has element with sku: "+this.sku.value+". Try agan!");
//    }else{
//        var newObj = {};
//        newObj.title = this.title.value;
//        newObj.sku = this.sku.value;
//        newObj.price = this.price.value;
//        objArray.push(newObj);
//    }
//    event.preventDefault();
//    //localStorage.setItem("objArr", objArray);
//    manualClosing();
//});;