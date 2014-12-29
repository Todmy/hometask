myApp.directive('isOrigin', function () {
        function isOriginal(sku, index) {

            //if ((action === 'add' && hasSimpleSku(sku) === 0) || (action === 'edit' && hasSimpleSku(sku) === 2)) {
            //   return false;
            //}

            return true;
        }

        return {
            require: 'ngModel',
            link: function (scope, elem, atrrs, ngModelCtrl) {

                //console.log('scope'); //scope
                //console.log(scope); //scope
                //console.log('elem'); //elem
                //console.log(elem); //elem
                //console.log('atrrs'); //atrrs:
                //console.log(atrrs); //atrrs:
                //console.log('ngModelCtrl'); //ngModelCtrl
                //console.log(ngModelCtrl); //ngModelCtrl
                //console.log('---');

                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    //console.log('scope parsers'); //scope
                    //console.log(scope); //scope
                    ngModelCtrl.$setValidity('isOrigin', isOriginal(viewValue, scope.objIndex));
                    return viewValue;
                });
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    //console.log('scope formatters'); //scope
                    //console.log(scope); //scope
                    ngModelCtrl.$setValidity('isOrigin', isOriginal(modelValue, scope.objIndex));
                    return modelValue;
                });
            }
        }
    }
);

function hasSimpleSku(sku) {
    for (var i = 0; i < arrElems.length; i++) {
        if (arrElems[i].sku == sku) {
            return true;
        }
    }
    return false;
}