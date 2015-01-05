angular.module('app').controller("AddElemController", function ($scope) {
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
            alert('Correctly fill in all fields!!!!');
            return;
        }

        switch ($scope.myAction) {
            case 'add':
                arrElems.push($scope.myObject);
                break;
            case 'edit':
                arrElems.splice($scope.objIndex, 1, $scope.myObject);
                break;
            default :
                throw new Error('An unknown action type');
                break;
        }

        this.close();
    };

    AddElemController.prototype.close = function () {
        $scope.visibleForm = false;
    };

    return new AddElemController();
});

angular.module('app').directive("myAddElementForm", function () {
    return {
        restrict: 'E',
        templateUrl: 'resources/form.html',
        replace: true,
        controller: 'AddElemController',
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

