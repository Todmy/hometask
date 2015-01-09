(function ($) {
    $.fn.jqRepeat = function (arrElems, template) {
        var self = this;
        var resultTmp = _.reduce(arrElems.getElement(), function (memo, num) {
            return memo + jqReplace(template, num)
        }, '');
        $(self).html(resultTmp);
    };
})(jQuery);

function jqReplace(template, obj) {
    _.each(_.keys(obj), function (num) {
        var pattReplace = new RegExp("\\${[\\s]*" + num + "[\\s]*}", 'g');
        template = template.replace(pattReplace, obj[num]);
    });
    return template;
}