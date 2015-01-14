(function ($) {
    $.Widget.prototype.jqRepeat = function (items, template) {
        return items.reduce(function (domNodes, item) {
            var itemHtml = $.trim(jqReplace(template, item));

            return domNodes.concat($.parseHTML(itemHtml));
        }, []);
    };

    function jqReplace(template, obj) {
        $.each(obj, function (key) {
            var patternReplace = new RegExp("\\${[\\s]*" + key + "[\\s]*}", 'g');
            template = template.replace(patternReplace, obj[key]);
        });

        return template;
    }
})(jQuery);
