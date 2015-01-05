angular.module('app').controller("AddElemController", function ($scope, arrElems) {
    function AddElemController() {
        $scope.submit = this.submit.bind(this);

        $scope.cancelAction = this.cancelAction.bind(this);
    }

    AddElemController.prototype.cancelAction = function () {
        if ($scope.mainObj.action === 'edit') {
            arrElems.setElement($scope.reservCopy, $scope.mainObj.index); /*when the user cancels action*/
        }
        this.close();
    };

    AddElemController.prototype.submit = function () {
        if (!$scope.product.$valid) {
            alert('Correctly fill in all fields!!!!');
            return;
        }

        switch ($scope.mainObj.action) {
            case 'add':
                arrElems.setElement($scope.newElem);
                break;
            case 'edit':
                arrElems.setElement($scope.newElem, $scope.mainObj.index);
                break;
            default :
                throw new Error('An unknown action type'); /*can be added other actions*/
                break;
        }

        this.close();
    };

    AddElemController.prototype.close = function () {
        $scope.mainObj.showForm = false;
    };

    return new AddElemController();
});

