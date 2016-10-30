'use strict';

angular.module('app')
.directive("listHeader", function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            search: '=',
            add: '&',
            edit: '&',
            save: '&',
            filter: '&'
        },
        templateUrl: '/views/list-header.html',
        link: function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }
    };
});