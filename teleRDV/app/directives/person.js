'use strict';

angular.module('app')
.directive("person", ["enumService", function () {
    return {
        restrict: 'E',
        scope: {
            person: '='
        },
        templateUrl: '/views/person.html'        
    };
}]);