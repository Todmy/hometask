var arrElems = [{title: 'prod1', sku: 'sku1', price: '14'},
    {title: 'prod2', sku: 'sku2', price: '234'},
    {title: 'prod3', sku: 'sku3', price: '76'}];
var myApp = angular.module('app', []);
myApp.controller('TableController', function ($scope) {
    $scope.arrElems = arrElems;
})


