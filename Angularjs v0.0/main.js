var arrElems = [{title: 'prod1', sku: 'sku1', price: '14'},
    {title: 'prod2', sku: 'sku2', price: '234'},
    {title: 'prod3', sku: 'sku3', price: '76'}];

var myApp = angular.module('app', []);

myApp.controller('TableController', TableController);

function TableController($scope) {

    $scope.mainObj = {};
    $scope.newElem = {};
    $scope.arrElems = arrElems;

    $scope.toJson = function () {
        $scope.mainObj._showJson = ($scope.mainObj._showJson) ? false : true;
    };

    $scope.del = function (index) {
        if (confirm('Do you want to delete ' + (1 + index) + ' element?')) arrElems.splice(index, 1);
    };

    $scope._addElement = function (str) {
        resetFilds($scope);
        showFormFunc($scope, str);
    };

    $scope._editElement = function (index) {
        $scope.newElem.index = index;

        $scope.newElem.title = arrElems[$scope.newElem.index].title;
        $scope.newElem.sku = arrElems[$scope.newElem.index].sku;
        $scope.newElem.price = (+arrElems[$scope.newElem.index].price); // caught an error in 'number' input

        showFormFunc($scope, 'edit');
    };
}

function showFormFunc($scope, str) {
    $scope.mainObj.showForm = true;
    $scope.mainObj.val = str;
}

function resetFilds($scope) {
    for (var key in $scope.newElem) {
        $scope.newElem[key] = '';
    }
}

myApp.directive("myAddElementForm", function () {
    return {
        restrict: 'E',
        templateUrl: 'form.html',
        replace: true,
        controller: addElemController
    }
});

myApp.controller("addElemController", addElemController);

function addElemController($scope) {
    $scope.submit = function () {
        if ($scope.newElem.index || $scope.newElem.index === 0) {
            arrElems.splice($scope.newElem.index, 1);
        }
        var errorObj = haveSomeErrors(this);
        if (errorObj !== null) {
            this.product[errorObj.inputArea].$invalid = true;
            alert(errorObj.message);
        } else {
            if ($scope.newElem.index || $scope.newElem.index === 0) {
                arrElems.splice($scope.newElem.index, 0, {
                    title: $scope.newElem.title,
                    sku: $scope.newElem.sku,
                    price: $scope.newElem.price
                });
            } else {
                arrElems.push({title: $scope.newElem.title, sku: $scope.newElem.sku, price: $scope.newElem.price}); //inputs reset because i used ng-if
            }
            resetFilds($scope);
            this.mainObj.showForm = false;
        }
    }
}

function haveSomeErrors(form) {
    if (!isOriginal(form.newElem.sku)) {
        return {inputArea: 'sku', message: 'Already exist elements with such SKU!'}
    } else if (form.newElem.price < 0) {
        return {inputArea: 'price', message: 'A price must be greater then 0!'}
    }
    return null;
}

function isOriginal(sku) {
    for (var i = 0; i < arrElems.length; i++) {
        if (arrElems[i].sku == sku) return false
    }
    return true;
}


