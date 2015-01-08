
(function ($) {

    $.widget('global.app', {
        options: {
            list: [],
            htmlPin: null
        },

        _create: function () {
        },

        _ctreateTable: function () {
            $(this.options.htmlPin).jqRepeat()
        },
        _setOptions: function (obj) {

            //this.options = obj;
            var self = this;
            _.each(obj, function(value, key){
                self.options[key] = value;
            });

            //why do I get bugs if a breakpoint set here?(only in Chrome)
            this._ctreateTable()
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        }
    });

    var tmp = $('[jq-app]');
    tmp.app();
    tmp.app({
        'list': arrElems.getElement(),
        'htmlPin': $('[jq-repeat]')
    });


})(jQuery);
