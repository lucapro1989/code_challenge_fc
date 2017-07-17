var APP = angular.module('justDressApp', ['ngRoute', 'ngStorage', 'app.config', 'app.proxy', 'AppControllers']);

APP.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            controller: 'controllerHome'
        }).
        otherwise({
            redirectTo: '/404'
        });

    }
])
