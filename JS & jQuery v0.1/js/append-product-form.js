function appendProductForm(htmlParent) {
    var fragment = $("<div/>").html('<div id="class-wrapper"></div>' +
    '<form id="product">' +
    '<table>' +
    '<tr>' +
    '<td>Title</td>' +
    '<td><input name="title" type="text" value=""></td>' +
    '</tr>' +
    '<tr>' +
    '<td>Sku</td>' +
    '<td><input name="sku" type="text" value=""></td>' +
    '</tr>' +
    '<tr>' +
    '<td>Price</td>' +
    '<td><input name="price" type="number" value=""></td>' +
    '</tr>' +
    '</table>' +
    '<button class="submit"></button>' +
    '</form>');
    $(htmlParent).append(fragment)
}