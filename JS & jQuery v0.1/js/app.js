(function ($) {

    $.widget('global.app', {

        options: {
            list: null,
            htmlPin: null,
            template: null
        },

        _ctreateTable: function () {
            $(this.options.htmlPin).jqRepeat(this.options.list, this.options.template);
            //this._jqRepeat(this.options.htmlPin);

            //console.log(this);

            this._on(this.element, {
                'click.to-json': 'showJson',
                'click.add': 'addElement',
                'click.edit': 'editElement',
                'click.delete': 'deleteElement'
            });

        },

        _create: function (obj) {
        },

        _init: function () { //implemented separately in order to empower. If we will have only one table we can to implement the initialization in _create method
            this.options.template = this.options.htmlPin[0].innerHTML;
            this._ctreateTable();
        },

        //_jqRepeat: function (self) {
        //    var resultTmp = _.reduce(arrElems.getElement(), function (memo, num) {
        //        return memo + jqReplace(self[0].innerHTML, num)
        //    }, '');
        //    $(self).html(resultTmp);
        //},

        showJson: function () {
            $('[jq-show]').html('')
                .append('<pre>' + JSON.stringify(this.options.list.getElement()) + '</pre>')
                .toggleClass('invisible');
        },

        addElement: function (e) {
            console.log(e);
        },

        editElement: function (e) {
            console.log(e.target.parentNode.parentNode.rowIndex);
        },

        deleteElement: function (e) {
            var index = e.target.parentNode.parentNode.rowIndex - 1;
            var message = 'Do you want to delete ' + this.options.list.getElement()[index].title +
                '(' + this.options.list.getElement()[index].sku + ') element?';

            if (confirm(message)) {
                this.options.list.deleteElement(index);
            }

            this._ctreateTable();
        },
        _setOptions: function (obj) {

            //this.options = obj;
            //var self = this;
            //_.each(obj, function (value, key) {
            //    self.options[key] = value;
            //});

            //why do I get bugs if a breakpoint set here?(only in Chrome)
            //this._ctreateTable()
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        }
    });

    //function jqReplace(tmp, obj) {
    //    _.each(_.keys(obj), function (num) {
    //        var pattReplace = new RegExp("\\${[\\s]*" + num + "[\\s]*}", 'g');
    //        tmp = tmp.replace(pattReplace, obj[num]);
    //    });
    //    return tmp;
    //}

    var myWidget = $('[jq-app]');
    //tmp.app();
    myWidget.app({
        'list': arrElems,
        'htmlPin': $('[jq-repeat]')
    });
    //console.log(tmp.app('option', 'list'))

})(jQuery);
