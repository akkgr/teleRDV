'use strict';

angular.module('app')
.directive("person", ["enumService", function (enumService) {
    return {
        restrict: 'E',
        scope: {
            person: '='
        },
        templateUrl: '/views/person.html',
        link: function (scope) {
            
        }
    };
}]);