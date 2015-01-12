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
                'click .to-json': '_showJson',
                'click .delete': 'deleteElement',
                'click .add': 'addElement',
                'click .edit': 'editElement',
                'submit [name=item]': '_submitProductForm'
            });

            this._appendFormItem();
            this._appendJsonPlace();

        },
        _appendFormItem: function () {
            var itemFormTemplate = $('#' + this.options.rowTemplate).text();
            this.element.append(itemFormTemplate);
            this.itemForm = this.element.find('form[name=item]').get(0);
        },

        _appendJsonPlace: function () {
            this.jsonPlace = $.parseHTML('<pre jq-show class="invisible"></pre>')[0];
            this.element.append(this.jsonPlace);
        },

        _init: function () { //implemented separately in order to empower. If we will have only one table we can to implement the initialization in _create method
            this.options.template = $(this.options.body).html();
            this._createTable();
        },

        _createTable: function () {
            var tableRows = this.jqRepeat(this.options.list.get(), this.options.template);
            $(this.options.body).html('').append(tableRows);
        },

        _showJson: function () {
            this.jsonPlace.innerHTML = JSON.stringify(this.options.list.get(), null, 2);
            $(this.jsonPlace).toggleClass('invisible');
        },

        deleteElement: function (event) {
            var index = $(event.target).closest('tr')[0].rowIndex - 1;
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
            this._productFormFill();
            this._showProductForm();
        },

        editElement: function (event) {
            var row = $(event.target).closest('tr');
            this.index = row[0].rowIndex - 1;
            var editableElement = arrElems.get(this.index);
            this._productFormFill(editableElement);
            this._showProductForm();
        },

        _productFormFill: function (currentItem) {
            if (!$.isEmptyObject(currentItem)) {
                this.itemForm.title.value = currentItem.title;
                this.itemForm.sku.value = currentItem.sku;
                this.itemForm.price.value = currentItem.price;
            } else {
                var self = this;
                $.each(self.itemForm, function (key) {
                    self.itemForm[key].value = '';
                })
            }
        },

        _showProductForm: function () {
            $(this.itemForm).removeClass('invisible')
                .find('button.submit').html(event.target.innerHTML);
            this.element.find('.modal-overlay').removeClass('invisible');
        },

        _submitProductForm: function (event) {
            event.preventDefault();
            var item = this.getNewItem();

            //var isValidObject = this._isValid(addForm);
            var isValidObject = {};

            if ($.isEmptyObject(isValidObject) && $(this.itemForm).find('button.submit').html() === 'add') {
                this.options.list.add(item);
                $(this.options.body).append(this.jqRepeat([item], this.options.template));
            } else if ($.isEmptyObject(isValidObject) && $(this.itemForm).find('button.submit').html() === 'edit') {
                this.options.list.add(item, this.index);
                var existedRow = this.options.body.children()[this.index];
                $(existedRow).find('td[data-name=title]').text(item.title);
                $(existedRow).find('td[data-name=sku]').text(item.sku);
                $(existedRow).find('td[data-name=price]').text(item.price);

                //$(insertRow).insertBefore(existedRow);
                //this._deleteHTMLDom(this.index + 1);
            } else {

                console.log(isValidObject.field + ' -==- ' + isValidObject.messageError)
            }

            $(this.itemForm).addClass('invisible');
            this.element.find('.modal-overlay').addClass('invisible');
        },

        getNewItem: function () {
            return {
                title: this.itemForm.title.value,
                sku: this.itemForm.sku.value,
                price: this.itemForm.price.value
            };
        },

        _addNewItem: function (item) {

        },





        _isValid: function (addForm) {
            var arrElems = this.options.list.get(),
                typeAction = addForm.find('button.submit').html(),
                title = addForm[0].title,
                sku = addForm[0].sku,
                message,
                arrErrorFields,
                price = addForm[0].price;

            if (!title.value || !price.value || !sku.value) {
                message = 'Fill all fields!';
                arrErrorFields = [];
                if (!title.value) {
                    arrErrorFields.push(title);
                }
                if (!sku.value) {
                    arrErrorFields.push(sku);
                }
                if (!price.value) {
                    arrErrorFields.push(price);
                }
                return new this._errorObject(message, arrErrorFields);
            }


            for (var i = 0, arr = arrElems.length; i < arr; i++) {
                if (arrElems[i].sku == sku.value && typeAction === 'add') {
                    arrErrorFields = [sku];
                    message = 'Sku in not unique';
                    return new this._errorObject(message, arrErrorFields);
                }
            }

            return {};

            //return permit
        },
        _errorObject: function (message, errorField) {
            this.messageError = message;
            this.field = errorField;
        }
    });

    $('[jq-app]').grid({
        list: arrElems,
        body: $('[jq-repeat]'),
        rowTemplate: 'product-form'
    });

//var itemFormTemplate = $('#' + this.options.rowTemplate).text();
//    this.itemForm = $(itemFormTemplate);
})(jQuery);
