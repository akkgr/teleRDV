'use strict';

angular.module('app')
.directive('selectPicker', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element) {
            $timeout(function () {
                var $el = $(element);
                $el.selectpicker('refresh');
            });
        }
    };
}]);