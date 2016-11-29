'use strict';

angular.module('app')
    .directive("calendar", [function () {
        return {
            restrict: 'E',
            scope: {
                year: '=',
                month: '='
            },
            templateUrl: '/views/calendar.html',
            link: function (scope) {

                scope.weekDays = ['Mo','Tu','We','Th','Fr','Sa','Su'];

                var monthNames = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ];

                scope.refresh = function () {
                    scope.monthName = monthNames[scope.month];
                    scope.days = [];
                    var monthDays = new Date(scope.year, scope.month, 0).getDate();
                    var wd = new Date(scope.year, scope.month, 1).getDay();

                    for (var i = 0; i < wd ; i++) {
                        scope.days.push('');
                    }

                    for (var i = 1; i < monthDays + 1 ; i++) {
                        scope.days.push(i);
                    }
                };

                scope.prevMonth = function () {
                    var d = new Date(scope.year, scope.month, 1);
                    d.setMonth(d.getMonth() - 1);
                    scope.month = d.getMonth();
                    scope.year = d.getFullYear();
                    scope.refresh();
                };

                scope.nextMonth = function () {
                    var d = new Date(scope.year, scope.month, 1);
                    d.setMonth(d.getMonth() + 1);
                    scope.month = d.getMonth();
                    scope.year = d.getFullYear();
                    scope.refresh();
                };

                scope.refresh();
            }
        };
    }]);