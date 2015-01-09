var arrElems = [{title: 'prod1', sku: 'sku1', price: 14},
    {title: 'prod2', sku: 'sku2', price: 234},
    {title: 'prod3', sku: 'sku3', price: 76}];

var myApp = angular.module('app', []);

myApp.controller('TableController', TableController);

function TableController($scope) {

    $scope.mainObj = {};
    $scope.newElem = {};
    $scope.arrElems = arrElems;

    $scope.toJson = function () {
        $scope.mainObj.showJson = ($scope.mainObj.showJson) ? false : true;
    };

    $scope.del = function (index) {
        if (confirm('Do you want to delete ' + (1 + index) + ' element?')) arrElems.splice(index, 1);
    };

    $scope.showElementForm = function (str, index) {
        $scope.mainObj.index = (index <= arrElems.length) ? index : arrElems.length;
        $scope.newElem = arrElems[$scope.mainObj.index];
        showFormFunc($scope, str);
    };
}

function showFormFunc($scope, str) {
    $scope.mainObj.showForm = true;
    $scope.mainObj.val = str;
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
        var errorObj = haveSomeErrors($scope, this);
        if (errorObj !== null) {
            $scope.newElem[errorObj.inputArea] = errorObj.func($scope.newElem[errorObj.inputArea]);
            alert(errorObj.message);
        } else {
            if ($scope.mainObj.val === 'add')arrElems.push($scope.newElem);
            this.mainObj.showForm = false;
        }
    }
    $scope.close = function () {
        if ($scope.mainObj.index === arrElems.length) {
            $scope.mainObj.showForm = false;
        } else {
            $scope.submit();
        }
    }
}

function haveSomeErrors($scope, form) {
    if (isOriginal(form.newElem.sku) && $scope.mainObj.index === arrElems.length || isOriginal(form.newElem.sku) > 1) {
        return {
            inputArea: 'sku',
            message: 'Already exist elements with such SKU!',
            func: function (cont) {
                return cont += '+';
            }
        }
    }
    if (form.newElem.price < 0) {
        return {
            inputArea: 'price', message: 'A price must be greater then 0!', func: function (cont) {
                return cont = -cont;
            }
        }
    }

    if (!form.product.$valid) {
        return {
            inputArea: 'title', message: 'Fill in all fields!'
        }
    }
    return null;
}

function isOriginal(sku) {
    var quantity = 0;
    for (var i = 0; i < arrElems.length; i++) {
        if (arrElems[i].sku == sku) quantity += 1;
    }
    return quantity;
}