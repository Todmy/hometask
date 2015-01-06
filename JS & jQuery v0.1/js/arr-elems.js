function CreateArrElems() {
    var list = [
        {title: 'prod1', sku: 'sku1', price: 14},
        {title: 'prod2', sku: 'sku2', price: 234},
        {title: 'prod3', sku: 'sku3', price: 76}
    ];
    return {
        setElement: function (elem, index) { /*adds element in some place of array, if index was passed and adds element at the end of array, if was not passed*/
            return (index !== undefined) ? list.splice(index, 1, elem) : list.push(elem);
        },
        getElement: function (index) { /*gets element by the index*/
            return (index !== undefined) ? list[index] : list;
        },
        deleteElement: function (index) { /*deletes element by index*/
            list.splice(index, 1);
        }
    }
}

var arrElems = new CreateArrElems();