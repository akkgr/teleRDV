'use strict';

angular.module('app')
.directive("myDateInput", ["localeService", function (localeService) {
    return {
        restrict: 'E',
        scope: {
            dateTime: '='
        },
        template: '<div class="input-group">'
            + '<input type="text" class="form-control" datetime-picker="{{language.dateFormat}}" datepicker-options="popup.options" ng-model="dateTime" is-open="popup.opened">'
            + '<span class="input-group-btn">'
            + '<button type="button" class="btn btn-default" ng-click="open()">'
            + '<i class="glyphicon glyphicon-calendar"></i></button></span></div>',

        link: function (scope) {
            scope.open = function () {
                scope.popup.opened = true;
            };

            scope.popup = {
                opened: false,
                options: {
                    showWeeks: false
                }
            };

            scope.language = localeService.language;
        }
    };
}]);