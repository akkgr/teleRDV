'use strict';

angular.module('app')
.directive("formHeader", function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            delete: '&',
            save: '&'
        },
        templateUrl: '/views/form-header.html',
        link: function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }
    };
});