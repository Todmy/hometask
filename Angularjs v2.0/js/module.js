angular.module('app', []);
angular.module('app').factory('arrElems', function () {
    return [{title: 'prod1', sku: 'sku1', price: 14},
        {title: 'prod2', sku: 'sku2', price: 234},
        {title: 'prod3', sku: 'sku3', price: 76}];
});

