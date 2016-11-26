'use strict';

angular.module('app')
    .directive("formHeader", function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                delete: '&?',
                save: '&?'
            },
            templateUrl: '/views/form-header.html',
            link: function (scope) {
                if (angular.isDefined(scope.delete)) {
                    scope.canDelete = true;
                } else {
                    scope.canDelete = false;
                }

                if (angular.isDefined(scope.save)) {
                    scope.canSave = true;
                } else {
                    scope.canSave = false;
                }

                $(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                })
            }
        };
    });