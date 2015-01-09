(function ($) {

    $.widget('global.app', {

        options: {
            list: null,
            htmlPin: null,
            template: null
        },

        _ctreateTable: function () {
            $(this.options.htmlPin).jqRepeat(this.options.list, this.options.template);

            this._off(this.element, 'click');
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

        showJson: function () {
            $('[jq-show]').html('')
                .append('<pre>' + JSON.stringify(this.options.list.getElement()) + '</pre>')
                .toggleClass('invisible');
        },

        _isValid: function (addForm) {
        },
        addElement: function (e) {
            //console.log(e);
            $('#class-wrapper').addClass('visible');
            var addForm = $('#product');
            addForm.addClass('visible').find('input[type="submit"]').attr('value', e.target.innerHTML);
            $(addForm).on('submit', function(event){
                event.preventDefault();
                _isValid(addForm);
            })
        },

        editElement: function (e) {
            //console.log(e.target.parentNode.parentNode.rowIndex);
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
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        }
    });

    var myWidget = $('[jq-app]');
    myWidget.app({
        'list': arrElems,
        'htmlPin': $('[jq-repeat]')
    });

})(jQuery);
