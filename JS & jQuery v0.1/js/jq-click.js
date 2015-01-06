(function ($) {
    //var arrElems = new CreateArrElems();
    $.fn.jqClick = function () {
        var arrClickPointers = $(this).find('[jq-click]');
        //console.log(arrClickPointers);
        _.each(arrClickPointers, jqActionBind);
    };
    function jqActionBind(obj) {
        $(obj).on('click', function(event) {
            var strFunc = obj.attributes[0].value;
            var index = event.target.parentNode.parentNode.rowIndex - 1;

            //deleteRow(index);
            //jsonFormat();

        })
    }
})(jQuery);

