myApp.directive('isOrigin', function () {
        function isOriginal(sku, index) {
            for (var i = 0, arr = arrElems.length; i < arr; i++) {
                if (arrElems[i].sku == sku && i !== index) {
                    return false;
                }
            }
            return true;
        }

        return {
            require: 'ngModel',
            link: function (scope, elem, atrrs, ngModelCtrl) {

                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('isOrigin', isOriginal(viewValue, scope.objIndex));
                    return viewValue;
                });
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('isOrigin', isOriginal(modelValue, scope.objIndex));
                    return modelValue;
                });
            }
        }
    }
);