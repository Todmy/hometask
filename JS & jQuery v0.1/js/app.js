(function ($) {

    $.widget('global.app', {

        options: {
            list: null,
            body: null,
            template: null
        },

        _createTable: function () {
            $(this.options.body).html('').append(this.jqRepeat(this.options.list.get(), this.options.template));

            this._off(this.element, 'click');
            this._on(this.element, {
                'click.to-json': 'showJson',
                'click.add': 'addElement',
                'click.edit': 'editElement',
                'click.delete': 'deleteElement',
                'submit#product': 'submitProductForm'
            });
        },

        _init: function () { //implemented separately in order to empower. If we will have only one table we can to implement the initialization in _create method
            this.options.template = $(this.options.body).html();
            this._createTable();
            appendProductForm(this.element);
        },

        showJson: function () {
            try {
                this.element.find('[jq-show]').html('')
                .append('<pre>' + JSON.stringify(this.options.list.get()) + '</pre>')
                .toggleClass('invisible');
            } catch (error){
                console.log('Maybe, you don\'t have place for showing JSON ([jq-show] attribute). Error: ' + error)
            }
        },

        _isValid: function (addForm) {
            return true;
        },

        submitProductForm: function (event) {
            var self = this;
            event.preventDefault();
            var addForm = this.element.find('#product');
            var isValid = self._isValid(addForm);
            if (isValid && addForm.find('button.submit').html() === 'add'){ ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                var obj = {};
                obj.title = addForm[0].title.value;
                obj.sku = addForm[0].sku.value;
                obj.price = addForm[0].price.value;
                self.options.list.set(obj);
                $(this.options.body).append(this.jqRepeat(Array(obj), this.options.template));
            }

            addForm.removeClass('visible');
            this.element.find('#class-wrapper').removeClass('visible');
        },

        addElement: function (event) {

            this.productFormFill();

            this.element.find('#product').addClass('visible').find('button.submit').html(event.target.innerHTML);
            this.element.find('#class-wrapper').addClass('visible');
        },

        productFormFill: function (title, sku, price) {
            var addForm = this.element.find('#product');
            addForm[0].title.value = title || '';
            addForm[0].sku.value = sku || '';
            addForm[0].price.value = price || '';

            console.log(title, sku, price)
        },

        editElement: function (event) {
            //console.log(e.target.parentNode.parentNode.rowIndex);
            var row = $(event.target).closest('tr');
            var index = row[0].rowIndex - 1;
            var title = row.find('td.elem-title'),
                sku = row.find('td.elem-sku'),
                price = row.find('td.elem-price');
            this.productFormFill(title[0].innerHTML, sku[0].innerHTML, price[0].innerHTML);

            this.element.find('#product').addClass('visible').find('button.submit').html(event.target.innerHTML);
            this.element.find('#class-wrapper').addClass('visible');
        },

        deleteElement: function (event) {
            var index = $(event.target).closest('tr')[0].rowIndex - 1;
            var message = 'Do you want to delete ' + this.options.list.get()[index].title +
                '(' + this.options.list.get()[index].sku + ') element?';

            if (confirm(message)) {
                this.element.find('[jq-repeat] tr').eq(index).remove();
                this.options.list.del(index);
            }
        }
    });

    var myWidget = $('[jq-app]');
    myWidget.app({
        'list': arrElems,
        "body": $('[jq-repeat]')
    });

})(jQuery);
