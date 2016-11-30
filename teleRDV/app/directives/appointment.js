'use strict';

angular.module('app')
.directive("appointment", ["enumService", "baseUrl", function (enumService, baseUrl) {
    return {
        restrict: 'E',
        scope: {
            appointment: '=',
            days: '='
        },
        templateUrl: '/views/appointment.html',
        link: function (scope) {
            
        }
    };
}]);