'use strict';

/* App Module */

angular.module('app', [
  'ngRoute',
  'angular-loading-bar',
  'treeControl',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'LocalStorageModule',
  'ngSanitize',
  'ui.checkbox',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker'
]);

angular.module('app')
.constant("baseUrl", "/");

angular.module('app')
.constant('ngAuthSettings', {
    apiServiceBaseUri: '/',
    clientId: 'cinnamon'
});

angular.module('app')
.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider
        .when("/login", {
            controller: "loginController",
            templateUrl: "views/login.html"
        })
        .when('/', {
            templateUrl: 'views/main.html'
        }).
        when('/subscribers', {
            templateUrl: 'views/subscribers.html',
            controller: 'SubscribersCtrl'
        }).
        when('/subscribers/:id', {
            templateUrl: 'views/subscriber.html',
            controller: 'SubscriberCtrl'
        }).
        when('/specialties', {
            templateUrl: 'views/specialties.html',
            controller: 'SpecialtiesCtrl'
        }).
        when('/specialties/:id', {
            templateUrl: 'views/specialty.html',
            controller: 'SpecialtyCtrl'
        }).
        when('/calendar', {
            templateUrl: 'views/calendar.html',
            controller: 'CalendarCtrl'
        }).
        when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersCtrl'
        }).
        when('/users/:id', {
            templateUrl: 'views/user.html',
            controller: 'UserCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);

angular.module('app')
.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);


angular.module('app')
.config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('scripts/angular-locale_{{locale}}.js');
}]);

angular.module('app')
.run([function () {
    toastr.options.positionClass = "toast-bottom-center";
    toastr.options.closeButton = true;
    toastr.options.timeOut = 0;
    toastr.options.extendedTimeOut = 0;
}]);

angular.module('app')
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
}]);

angular.module('app')
.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

angular.module('app')
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
          .setStorageType('sessionStorage');
    }]);