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
                if (angular.isDefined(scope.add)) {
                    scope.canAdd = true;
                } else {
                    scope.canAdd = false;
                }
                
                if (angular.isDefined(scope.edit)) {
                    scope.canEdit = true;
                } else {
                    scope.canEdit = false;
                }

                $(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                })
            }
        };
    });