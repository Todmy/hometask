angular.module('app').directive('isOrigin', function (arrElems) {
        var tmpListElems = arrElems.get();
        function isOriginal(sku, index) { /*checks whether there is an elements with such sku, but not the object which we edit*/
            for (var i = 0, arr = tmpListElems.length; i < arr; i++) {
                if (tmpListElems[i].sku == sku && i !== index) {
                    return false;
                }
            }
            return true;
        }

        return {
            require: 'ngModel',
            link: function (scope, elem, atrrs, ngModelCtrl) {

                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('isOrigin', isOriginal(viewValue, scope.mainObj.index));
                    return viewValue;
                });
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('isOrigin', isOriginal(modelValue, scope.mainObj.index));
                    return modelValue;
                });
            }
        }
    }
);