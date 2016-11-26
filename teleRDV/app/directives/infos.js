'use strict';

angular.module('app')
.directive("infos", ["enumService", function (enumService) {
    return {
        restrict: 'E',
        scope: {
            title: '=',
            infos: '='
        },
        templateUrl: '/views/infos.html',
        link: function (scope) {
            enumService.InfoTypes().then(function (response) {
                scope.infoTypes = response.data;
            });

            scope.addInfo = function () {
                scope.infos.push({});
            };

            scope.deleteInfo = function (phone) {
                var index = scope.infos.indexOf(phone, 0);
                if (index > -1) {
                    scope.infos.splice(index, 1);
                }
            };
        }
    };
}]);