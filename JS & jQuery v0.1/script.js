var arrElems = [{title: 'prod1', sku: 'sku1', price: 14},
    {title: 'prod2', sku: 'sku2', price: 234},
    {title: 'prod3', sku: 'sku3', price: 76}];



(function ($) {
    $.fn.repeatRows = function (arrElemsForTable) {
        var tbody = document.createDocumentFragment();
        for(var i=0; i < arrElemsForTable.length; i++){

        }
    }
})(jQuery);

console.log($('#data tbody:eq(0)'))
//var placeForRows = $('#data tbody:eq(0)');