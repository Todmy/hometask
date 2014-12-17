function getArrayFromHTML(htmlTable) { //create new array with elements from table
    var rowsArr = Array.prototype.slice.apply($(htmlTable).children()[1].children);//to array
    return rowsArr.map(function (currentValue) { //return array of objects
        var cellArr = Array.prototype.slice.apply($(currentValue).children());//to array
        return cellArr.reduce(function (previousValue, currentValue, index, array) { //return an object
            if (index < (array.length - 1)) {
                var key = $(htmlTable).children()[0].children[0].children[index].innerHTML;
                previousValue[key] = currentValue.innerHTML;
            }
            return previousValue;
        }, {});
    });
}

$("button.to-JSON").bind("click", function () {//write the list of JSON objects to console
    console.log(JSON.stringify(getArrayFromHTML($("#data"))));
});

$("#data").bind("click", function (event) {//delegate events for "edit" and "delete"
    var target = event.target;
    if($(target).hasClass("delete")){ //if delete button
        var delElemSku = $(target).parent().parent().children()[1].innerHTML;
        var question = confirm("Do you watn delete element with sku '" + delElemSku + "'?");
        if (question) {
            $(target).parent().parent().remove();
        }
    }else if($(target).hasClass("edit")){//if edit button
        $("#product").addClass("visible").children()[1].value = "edit";
        $("#class-wrapper").addClass("visible");
        var cells = $(target).parent().parent().children();
        Array.prototype.forEach.call(cells, function(currentValue, index, array){
            if(index < array.length-1) {
                $("#product").find("input")[index].value = currentValue.innerHTML;
            }
        });
        $(cells).parent().addClass("editing");
    }
});

$("body button.add").bind("click", function () { //add new element to table
    $("#product").addClass("visible").children()[1].value = "add";
    $("#class-wrapper").addClass("visible");
});

function manualClosing() { //it replaces the function of closing the window
    $("#product").removeClass("visible");
    $("#class-wrapper").removeClass("visible");
    var inputArr = Array.prototype.slice.apply($("#product").find("input"));
    inputArr.forEach(function(currentElement, index, array){
        if(index < array.length-1) currentElement.value = "";
    });
}

function isEmpty(places) { //are all inputs are filled?
    for(var i = 0; i < places.length-1; i++){
        if(places[i].value.trim() === ""){
            return true;
        }
    }
    return false;
}

$("#product").bind("submit", function (event) { //check out elements of creating/editing form
    event.preventDefault();
    var inputs = $(this).find("input");
    if(!isEmpty(inputs)){
        if($("#product").children()[1].value === "add"){ //if add form
            var newRow = document.createElement("tr");
            newRow.innerHTML = "<td>"+this.title.value+"</td> <td>"+this.sku.value+"</td> <td>"+this.price.value+"</td> <td> <button class='edit'>edit</button> <button class='delete'>delete</button> </td>"
            $("#data tbody").append(newRow);
        } else { //if edit form
            var cellsArr = Array.prototype.slice.apply($("#data .editing").children());
            cellsArr.forEach(function(currentElement, index, array){
                if(index < array.length-1) currentElement.innerHTML = inputs[index].value;
            });
            $("#data .editing").removeClass("editing");
        }
    }else{
        alert("Error. All fields must be filled. Try agan.");
    }
    manualClosing();
});
