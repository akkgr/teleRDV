'use strict';

angular.module('app')
.directive("listHeader", function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            search: '=',
            add: '&?',
            edit: '&?',
            save: '&',
            filter: '&'
        },
        templateUrl: '/views/list-header.html',
        link: function (scope) {

            scope.canAdd = angular.isDefined(scope.add) ? true : false;
            scope.canEdit = angular.isDefined(scope.edit) ? true : false;

            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }
    };
});