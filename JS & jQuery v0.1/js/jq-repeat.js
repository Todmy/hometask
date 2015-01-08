(function ($) {
    $.fn.jqRepeat = function () {
        var self = this;
        var resultTmp = _.reduce(arrElems.getElement(), function (memo, num) {
            return memo + jqReplace(self[0].innerHTML, num)
        }, '');
        $(self).html(resultTmp);
    };
})(jQuery);

function jqReplace(tmp, obj) {
    _.each(_.keys(obj), function (num) {
        var pattReplace = new RegExp("\\${[\\s]*" + num + "[\\s]*}", 'g');
        tmp = tmp.replace(pattReplace, obj[num]);
    });
    return tmp;
}