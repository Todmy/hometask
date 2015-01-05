angular.module('app').controller('TableController', function ($scope, arrElems) {
    function TableController() {

        $scope.mainObj = {};
        $scope.newElem = {};
        $scope.arrElems = arrElems;

        $scope.deleteElement = this.deleteElement.bind(this);

        $scope.showElementForm = this.showElementForm.bind(this);
    }

    TableController.prototype.showElementForm = function (action, index) {
        $scope.mainObj.index = (index <= arrElems.length) ? index : arrElems.length;
        $scope.newElem = arrElems[$scope.mainObj.index] || {};
        $scope.mainObj.action = action;
        $scope.mainObj.showForm = true;
    };

    TableController.prototype.deleteElement = function (index) {
        var message = 'Do you want to delete ' + arrElems[index].title + '(' + arrElems[index].sku + ')' + ' element?';

        if (confirm(message)) {
            arrElems.splice(index, 1);
        }
    };

    return new TableController();
});

