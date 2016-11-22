'use strict';

angular.module('app')
.directive("phones", ["enumService", function (enumService) {
    return {
        restrict: 'E',
        scope: {
            title: '=',
            phones: '='
        },
        templateUrl: '/views/phones.html',
        link: function (scope) {

            enumService.PhoneTypes().then(function (response) {
                scope.phoneTypes = response.data;
            });

            scope.addPhone = function () {
                scope.phones.push({});
            };

            scope.deletePhone = function (phone) {
                var index = scope.phones.indexOf(phone, 0);
                if (index > -1) {
                    scope.phones.splice(index, 1);
                }
            };
        }
    };
}]);