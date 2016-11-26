'use strict';

angular.module('app')
.directive("appointment", ["enumService", function (enumService) {
    return {
        restrict: 'E',
        scope: {
            appointment: '='
        },
        templateUrl: '/views/appointment.html',
        link: function (scope) {
            
        }
    };
}]);