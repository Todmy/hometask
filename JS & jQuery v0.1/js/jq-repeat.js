(function ($) {
    $.fn.jqRepeat = function (arrElems, template) {
        var self = this;
        var resultTmp = arrElems.getElement().reduce(function (memo, num) {
            return memo + jqReplace(template, num)
        }, '');
        $(self).html(resultTmp);
    };

    function jqReplace(template, obj) {
        $.each(obj, function (key, element) {
            var patternReplace = new RegExp("\\${[\\s]*" + key + "[\\s]*}", 'g');
            template = template.replace(patternReplace, obj[key]);
        });
        return template;
    }
})(jQuery);

