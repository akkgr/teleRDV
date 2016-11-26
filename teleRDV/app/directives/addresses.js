'use strict';

angular.module('app')
.directive("addresses", ["enumService", function (enumService) {
    return {
        restrict: 'E',
        scope: {
            title: '=',
            addresses: '='
        },
        templateUrl: '/views/addresses.html',
        link: function (scope) {
            enumService.AddressTypes().then(function (response) {
                scope.addressTypes = response.data;
            });

            scope.addAddress = function () {
                scope.addresses.push({});
            };

            scope.deleteAddress = function (address) {
                var index = scope.addresses.indexOf(address, 0);
                if (index > -1) {
                    scope.addresses.splice(index, 1);
                }
            };
        }
    };
}]);