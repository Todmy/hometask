myApp.directive("myAddElementForm", function () {
    return {
        restrict: 'E',
        templateUrl: 'form.html',
        replace: true,
        controller: addElemController,
        scope: {
            myAction: '=myAction',
            visibleForm: '=ngShow',
            myObject: '=myObject',
            objIndex: '=objIndex'
        }
    }
});

myApp.controller("addElemController", addElemController);

function addElemController($scope) {

    $scope.submit = function () {

        $scope.reservCopy = angular.copy(arrElems[$scope.objIndex]);

        if (!this.product.$valid) {
            var message = 'Correctly fill in all fields!!!!';
            //$scope.$digest();
            //$scope.newElem[errorObj.inputArea] = errorObj.func($scope.newElem[errorObj.inputArea]);
            alert(message);
            return false;
        }

        if ($scope.myAction === 'add') {
            arrElems.push($scope.myObject);
        }
        if($scope.myAction === 'edit'){
            arrElems.splice($scope.objIndex, 1, $scope.myObject);
        }
        $scope.visibleForm = false;

    };
    $scope.close = function () {

        arrElems[$scope.objIndex] = $scope.reservCopy;
        //console.log(this.product.$pristine);
        $scope.visibleForm = false;
    }
}

function haveSomeErrors($scope, form) {
    //if (form.product.price.$modelValue < 0) {
    //    return {
    //        inputArea: 'price',
    //        message: 'A price must be greater then 0!'
    //        //func: function (cont) {
    //        //    return cont = -cont;
    //        //}
    //    }
    //}
    //
    //if (!form.product.$valid) {
    //    return {
    //        inputArea: 'title',
    //        message: 'Fill in all fields!'
    //    }
    //}


    if (isOriginal(form.product.sku.$modelValue, $scope.myAction, $scope)) {
        return {
            inputArea: 'sku',
            message: 'Already exist elements with such SKU!'/*,
            func: function (cont) {
                return cont += '+';
            }*/
        }
    }

    return null;

}


