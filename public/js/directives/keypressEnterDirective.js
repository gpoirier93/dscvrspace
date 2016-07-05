app.directive('keypress-enter', ['$log', function ($log) {
    return function (scope, element, attrs) {
        $log(scope + element + attrs);
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
}]);