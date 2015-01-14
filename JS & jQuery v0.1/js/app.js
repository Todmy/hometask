(function ($) {

    $.widget('global.grid', {

        options: {
            list: null,
            body: null,
            rowTemplate: null,
            template: null
        },

        _create: function () {
            this._on(this.element, {
                'click .to-json': 'showJson',
                'click .delete': 'deleteElement',
                'click .add': 'addElement',
                'click .edit': 'editElement',
                'submit [name=item]': '_submitProductForm',
                'click .cancel': 'closeForm',
                'click .modal-overlay': 'closeForm'
            });

            this._appendFormItem();
            this._appendJsonPlace();

            this.validates('[name=item] input[name=title]', 'required')
                .validates('[name=item] input[name=sku]', 'required unique')
                .validates('[name=item] input[name=price]', 'required number');

        },

        _appendFormItem: function () {
            var itemFormTemplate = $('#' + this.options.rowTemplate).text();
            this.element.append(itemFormTemplate);
            this.itemForm = this.element.find('form[name=item]').get(0);
        },

        _appendJsonPlace: function () {
            this.jsonPlace = $('<pre class="invisible"></pre>');
            this.element.append(this.jsonPlace);
        },

        _init: function () { //implemented separately in order to empower. If we will have only one table we can to implement the initialization in _create method
            this.options.template = $(this.options.body).html();
            this._createTable();
        },

        _createTable: function () {
            var tableRows = this.jqRepeat(this.options.list.get(), this.options.template);
            this.options.body.text('').append(tableRows);
        },

        showJson: function () {
            var dump = JSON.stringify(this.options.list.get(), null, 2);
            this.jsonPlace.text(dump).toggleClass('invisible');
        },

        deleteElement: function (event) {
            var index = $(event.target).closest('tr').index();
            var message = 'Do you want to delete ' + this.options.list.get()[index].title +
                '(' + this.options.list.get()[index].sku + ') element?';

            if (confirm(message)) {
                this._deleteRowAt(index);
            }
        },

        _deleteRowAt: function (index) {
            this.element.find('[jq-repeat] tr').eq(index).remove();
            this.options.list.del(index);
        },

        addElement: function () {
            this._fillProductForm();
            this._showProductForm();
        },

        editElement: function (event) {
            var row = $(event.target).closest('tr');
            this.index = row.index();
            this.editableElementLink = this.options.list.get(this.index); //got this link only for purpose to correctly validate uniqueness sku
            var editableElement = arrElems.get(this.index);
            this._fillProductForm(editableElement);
            this._showProductForm();
        },

        _fillProductForm: function (currentItem) {
            var form = this.itemForm;
            currentItem = currentItem || {};

            $.each('title sku price'.split(' '), function (i, fieldName) {
                form[fieldName].value = currentItem[fieldName] || '';
            });
        },

        _showProductForm: function () {
            $(this.itemForm).removeClass('invisible')
                .find('input[type=submit]').attr('value', event.target.innerHTML);
            this.element.find('.modal-overlay').removeClass('invisible');
        },

        validates: function (selector, validators) {
            var validate = this._getValidators(validators);

            this._on(this.element.find(selector), {
                change: validate
            });

            return this;
        },

        _getValidators: function (validators) {
            var self = this;
            return function (event) {
                validators.split(' ').forEach(function (element) {
                    var errorObject = self.validFunctionsHolder(element, event);
                    $(event.target).removeClass('invalid');
                    if(!errorObject.isValid && !$(event.target).hasClass('invalid')){
                        $(event.target).addClass('invalid');
                        console.log(errorObject.errorMessage);
                    } else if (errorObject.isValid && $(event.target).hasClass('invalid')) {
                        $(event.target).removeClass('invalid');
                    }
                })
            }
        },

        validFunctionsHolder: function (key, event) {
            switch (key) {
                case 'required':
                    return {
                        isValid: !!event.target.value,
                        errorMessage: 'Not filled all fields'
                    };
                case 'unique':
                    return {
                        isValid: this.isUnique(event),
                        errorMessage: 'Not unique SKU'
                    };
                case 'number':
                    return {
                        isValid: typeof (+event.target.value) === 'number',
                        errorMessage: 'Price must be a number'
                    };
                default :
                    throw new Error('An unknown validation query');
                    /*can be added other validation queries*/
                    break;
            }
        },

        isUnique: function (event) {
            var self = this;
            return this.options.list.get().every(function(elem){
                return event.target.value !== elem.sku || elem === self.editableElementLink;
            });
        },

        _submitProductForm: function (event) {
            var item = this._getNewItem();

            event.preventDefault();

            var isValid = this._isValidForm();

            if (isValid && $(this.itemForm).find('input[type=submit]').attr('value') === 'add') {
                this._addNewItem(item);
                this._hideForm();
            } else if (isValid && $(this.itemForm).find('input[type=submit]').attr('value') === 'edit') {
                this._editCurrentItem(item);
                this._hideForm();
                this.editableElementLink = {};
            }
        },

        _getNewItem: function () {
            return {
                title: this.itemForm.title.value,
                sku: this.itemForm.sku.value,
                price: this.itemForm.price.value
            };
        },

        _isValidForm: function () {
            return $.makeArray($(this.itemForm).find('input')).every(function (element) {
                return !$(element).hasClass('invalid');
            })
        },

        _addNewItem: function (item) {
            this.options.list.add(item);
            $(this.options.body).append(this.jqRepeat([item], this.options.template));
        },

        _editCurrentItem: function (item) {
            this.options.list.add(item, this.index);
            var existedRow = this.options.body.children().eq(this.index);
            $(existedRow).find('[data-name=title], [data-name=sku], [data-name=price]').each(function (index, element) {
                var value = item[$.attr(this, 'data-name')];
                $(this).text(($(this).attr('data-name')==='price')?'$ '+value:value);
            });
        },

        closeForm: function(event){
            event.preventDefault();
            this._hideForm()
        },

        _hideForm: function () {
            $(this.itemForm).addClass('invisible');
            this.element.find('.modal-overlay').addClass('invisible');
        }

    });

    $('[jq-app]').grid({
        list: arrElems,
        body: $('[jq-repeat]'),
        rowTemplate: 'product-form'
    });
})(jQuery);
