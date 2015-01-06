(function ($) {
    //var arrElems = new CreateArrElems();
    $.fn.jqRepeat = function () {
        var resultTmp = _.reduce(arrElems.getElement(), function (memo, num) {
            return memo + jqReplace(tmpRepeatPointer, num)
        }, '');
        $(this).find('[jq-repeat]').html(resultTmp);
    };
})(jQuery);

function jqReplace(tmp, obj) {
    _.each(_.keys(obj), function (num) {
        var pattReplace = new RegExp("\\${[\\s]*" + num + "[\\s]*}", 'g');
        tmp = tmp.replace(pattReplace, obj[num]);
    });
    return tmp;
}