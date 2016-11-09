'use strict';

angular.module('app')
.directive("formHeader", function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            delete: '&?',
            save: '&'
        },
        templateUrl: '/views/form-header.html',
        link: function (scope) {

            scope.canDelete = angular.isDefined(scope.delete) ? true : false;

            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }
    };
});