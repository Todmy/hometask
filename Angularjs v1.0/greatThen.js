myApp.directive('greatThen', function () {
    var isValid = function (numb, lim) {
        return numb > lim;
    };
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModelCtrl) {
            ngModelCtrl.$parsers.unshift(function (viewValue) {
                ngModelCtrl.$setValidity('greatThen', isValid(viewValue, attrs.greatThen));
                return viewValue
            });
            ngModelCtrl.$formatters.unshift(function (modelValue) {
                ngModelCtrl.$setValidity('greatThen', isValid(modelValue, attrs.greatThen));
                return modelValue
            })
        }
    }
});