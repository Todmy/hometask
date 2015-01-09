(function ($) {
    $.Widget.prototype.jqRepeat = function (arrElements, template) {
        //var self = this;
        //console.log(arrElems.constructor);
        //if(){
        //
        //}
        return arrElements.map(function (num, ind) {
            return $.parseHTML(jqReplace(template, num)).filter(function(elem){ return elem.nodeType === 1})[0];
        });
        //$(self).html('').append(resultTmp);
    };

    function jqReplace(template, obj) {
        $.each(obj, function (key) {
            var patternReplace = new RegExp("\\${[\\s]*" + key + "[\\s]*}", 'g');
            template = template.replace(patternReplace, obj[key]);
        });

        return template;
    }
})(jQuery);
