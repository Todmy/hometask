function deleteRow(index) {
    //var arrElems = new CreateArrElems();

    var message = 'Do you want to delete ' + arrElems.getElement(index).title + '(' + arrElems.getElement(index).sku + ')' + ' element?';

    if (confirm(message)) {
        $('[jq-app]').find('[jq-repeat]').html('');
        arrElems.deleteElement(index);
    }
    /**
     * not good idea...
     */
    $('[jq-app]').jqRepeat();
    $('[jq-app]').jqClick();
};