angular.module('app').controller('TableController', function ($scope, arrElems) {
    function TableController() {
        /*add new global objects for using them in the $scope*/
        $scope.mainObj = {}; /*stores some triggers, variables and functions*/
        $scope.newElem = {}; /*an element which we edit/add */
        $scope.list = arrElems.get(); /*for ng-reply*/

        $scope.del = this.deleteElement.bind(this);

        $scope.showElementForm = this.showElementForm.bind(this);
    }

    TableController.prototype.showElementForm = function (action, index) {
        $scope.mainObj.index = (index <= $scope.list.length) ? index : $scope.list.length;
        $scope.newElem = arrElems.get($scope.mainObj.index) || {};
        $scope.reservCopy = angular.copy($scope.newElem); /*a copy of the object being edited(for replacement when user cancels action)*/
        $scope.mainObj.action = action; /*add || edit*/
        $scope.mainObj.showForm = true;
    };

    TableController.prototype.del = function (index) {
        var message = 'Do you want to delete ' + $scope.list[index].title + '(' + $scope.list[index].sku + ')' + ' element?';

        if (confirm(message)) {
            arrElems.del(index);
        }
    };

    return new TableController();
});

