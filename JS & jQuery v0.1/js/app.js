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

            this._appendItemForm();
            this._appendJsonPlace();

            this.validates('[name=item] input[name=title]', 'required')
                .validates('[name=item] input[name=sku]', 'required unique')
                .validates('[name=item] input[name=price]', 'required number');

        },

        _appendItemForm: function () {
            var itemFormTemplate = $('#' + this.options.rowTemplate).text();

            this.element.append(itemFormTemplate);
            this.itemForm = this.element.find('form[name=item]');
        },

        _appendJsonPlace: function () {
            this.jsonOutput = $('<pre class="invisible"></pre>');
            this.element.append(this.jsonOutput);
        },

        _init: function () { //implemented separately in order to empower. If we will have only one table we can to implement the initialization in _create method
            this.options.template = this.options.body.html();
            this._createTable();
        },

        _createTable: function () {
            var tableRows = this.jqRepeat(this.options.list.get(), this.options.template);

            this.options.body.empty().append(tableRows);
        },

        showJson: function () {
            var dump = JSON.stringify(this.options.list.get(), null, 2);

            this.jsonOutput.text(dump).toggleClass('invisible');
        },

        deleteElement: function (event) {
            var index = $(event.target).closest('tr').index();
            var message = 'Do you want to delete ' + this.options.list.get(index).title +
                '(' + this.options.list.get(index).sku + ') element?';

            if (confirm(message)) {
                this._deleteRowAt(index);
            }
        },

        _deleteRowAt: function (index) {
            this.options.body.find('tr').eq(index).remove();
            this.options.list.del(index);
        },

        addElement: function () {
            this._fillProductForm();
            this._showProductForm();
        },

        editElement: function (event) {
            var row = $(event.target).closest('tr');

            this.editableElement = this.options.list.get(row.index()); //got this link only for purpose to correctly validate uniqueness sku
            this._fillProductForm(this.editableElement);
            this._showProductForm();
        },

        _fillProductForm: function (currentItem) {
            var form = this.itemForm.get(0);

            currentItem = currentItem || {};

            $.each('title sku price'.split(' '), function (i, fieldName) {
                form[fieldName].value = currentItem[fieldName] || '';
            });
        },

        _showProductForm: function () {
            this.itemForm.removeClass('invisible')
                .find('input[type=submit]').attr('value', $(event.target).attr('name'));
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
                validators.split(' ').forEach(function (validAttrs) {
                    var field = $(event.target);
                    var errorObject = self._validationRules[validAttrs].call(self, field.get(0));

                    field.removeClass('invalid');
                    if(!errorObject.exists){
                        field.addClass('invalid');
                        throw new Error(errorObject.errorMessage);
                    }
                })
            }
        },

        _validationRules: { /*can be added other validation queries*/
            required: function (field) {
                return {
                    exists: !!field.value,
                    errorMessage: 'Not filled all fields'
                }
            },

            unique: function (field) {
                var isUnique = this.options.list.get().every(function(elem){
                        return field.value !== elem.sku || elem === this.editableElement;
                    }, this);

                return {
                    exists: isUnique,
                    errorMessage: 'Not unique SKU'
                }
            },

            number: function (field) {
                return {
                    exists: typeof (+field.value) === 'number',
                    errorMessage: 'Price must be a number'
                }
            }
        },

        _submitProductForm: function (event) {
            var item = this._getNewItem();
            var isValid = this._isValidForm();
            var createOrUpdate = '_' + this.itemForm.find('input[type=submit]').attr('value') + 'Item';

            event.preventDefault();

            if(isValid){
                this[createOrUpdate](item);
            }
        },

        _getNewItem: function () {
            var item = this.itemForm.get(0);

            return {
                title: item.title.value,
                sku: item.sku.value,
                price: item.price.value
            };
        },

        _isValidForm: function () {
            return this.itemForm.find('input').toArray().every(function (element) {
                return !$(element).hasClass('invalid');
            })
        },

        _createItem: function (item) {
            this._addNewItem(item);
            this._hideForm();
        },

        _updateItem: function (item) {
            this._editCurrentItem(item);
            this._hideForm();
            this.editableElement = {};
        },

        _addNewItem: function (item) {
            this.options.list.add(item);
            this.options.body.append(this.jqRepeat([ item ], this.options.template));
        },

        _editCurrentItem: function (item) {
            var index = this.options.list.get().indexOf(this.editableElement);
            var existedRow = this.options.body.children().eq(index);
            var formatters = this._formatters;

            this.editableElement = item;

            $(existedRow).find('[data-name=title], [data-name=sku], [data-name=price]').each(function (index, element) {
                var fieldName = $.attr(element, 'data-name');
                var format = formatters[fieldName] || formatters['default'];

                $(element).text(format(item[fieldName]));
            });
        },

        _formatters: {
            'default': function (value) {
                return value
            },

            price: function (value) {
                return '$ ' + value;
            }
        },

        closeForm: function(event){
            event.preventDefault();
            this._hideForm()
        },

        _hideForm: function () {
            this.itemForm.addClass('invisible');
            this.element.find('.modal-overlay').addClass('invisible');
        }

    });

    $('[jq-app]').grid({
        list: arrElems,
        body: $('[jq-repeat]'),
        rowTemplate: 'product-form'
    });
})(jQuery);
