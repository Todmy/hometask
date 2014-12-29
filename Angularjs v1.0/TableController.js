myApp.controller('TableController', TableController);

function TableController($scope) {

    $scope.mainObj = {};
    $scope.newElem = {};
    $scope.arrElems = arrElems;

    $scope.deleteElement = function (index) {
        var message = 'Do you want to delete ' + arrElems[index].title + '(' + arrElems[index].sku + ')' + ' element?';

        if (confirm(message)) {
            arrElems.splice(index, 1);
        }
    };

    $scope.showElementForm = function (action, index) {
        $scope.mainObj.index = (index <= arrElems.length) ? index : arrElems.length;
        $scope.newElem = arrElems[$scope.mainObj.index];
        $scope.mainObj.action = action;
        $scope.mainObj.showForm = true;
    };
}