'use strict';

angular.module('app')
.directive("appointments", [function () {
    return {
        restrict: 'E',
        scope: {
            appointments: '='
        },
        templateUrl: '/views/appointments.html'
    };
}]);