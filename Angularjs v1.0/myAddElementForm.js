myApp.controller("addElemController", function ($scope) {
    function AddElemController() {
        $scope.submit = this.submit.bind(this);

        $scope.cancelAction = this.cancelAction.bind(this);
    }

    AddElemController.prototype.cancelAction = function () {
        if ($scope.myAction === 'edit') {
            arrElems[$scope.objIndex] = $scope.reservCopy;
        }
        this.close();
    };

    AddElemController.prototype.submit = function () {

        if (!$scope.product.$valid) {
            var message = 'Correctly fill in all fields!!!!';
            alert(message);
            return false;
        }

        if ($scope.myAction === 'add') {
            arrElems.push($scope.myObject);
        }

        if ($scope.myAction === 'edit') {
            arrElems.splice($scope.objIndex, 1, $scope.myObject);
        }
        this.close();
    };

    AddElemController.prototype.close = function () {
        $scope.visibleForm = false;
    };

    return new AddElemController();
});

myApp.directive("myAddElementForm", function () {
    return {
        restrict: 'E',
        templateUrl: 'form.html',
        replace: true,
        controller: 'addElemController',
        scope: {
            myAction: '=myAction',
            visibleForm: '=ngIf',
            myObject: '=myObject',
            objIndex: '=objIndex'
        },
        link: function (scope) {
            scope.reservCopy = angular.copy(arrElems[scope.objIndex]);
        }
    }
});

