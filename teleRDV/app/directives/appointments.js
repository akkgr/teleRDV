'use strict';

angular.module('app')
.directive("appointments", ["enumService", function (enumService) {
    return {
        restrict: 'E',
        scope: {
            appointments: '='
        },
        templateUrl: '/views/appointment.html',
        link: function (scope) {
            
        }
    };
}]);