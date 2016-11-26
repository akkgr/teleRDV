'use strict';

angular.module('app')
.directive("scheduler", ['enumService', function (enumService) {
    return {
        restrict: 'E',
        scope: {
            schedule: '='
        },
        templateUrl: '/views/scheduler.html',
        link: function (scope) {
            function isOpen() {
                var open = [];
                for (var n = 0; n < 7; n++) {
                    open[n] = [];
                    for (var m = 0; m < 2; m++) {
                        open[n][m] = [];
                        for (var z = 0; z < 2; z++) {
                            open[n][m][z] = false;
                        }
                    }
                }
                return open;
            }

            enumService.WeekDays().then(function (response) {
                scope.weekDays = response.data;
                scope.daysOrder = [1, 2, 3, 4, 5, 6, 0];
                scope.timesOrder = [0, 1];

                scope.dynamicPopover = {
                    templateUrl: 'myPopoverTemplate.html',
                    hour: 0,
                    minute: 0,
                    n: 0,
                    m: 0,
                    z: 0,
                    isOpen: isOpen()
                };
            });

            scope.changeActive = function (n) {
                scope.schedule.DayEntries[n].Active = !scope.schedule.DayEntries[n].Active;
            };

            scope.popover = function (n, m, z) {
                if (scope.dynamicPopover.z == 0) {
                    scope.schedule.DayEntries[scope.dynamicPopover.n].TimeEntries[scope.dynamicPopover.m].StartHour = scope.dynamicPopover.hour;
                    scope.schedule.DayEntries[scope.dynamicPopover.n].TimeEntries[scope.dynamicPopover.m].StartMinute = scope.dynamicPopover.minute;
                }

                if (scope.dynamicPopover.z == 1) {
                    scope.schedule.DayEntries[scope.dynamicPopover.n].TimeEntries[scope.dynamicPopover.m].EndHour = scope.dynamicPopover.hour;
                    scope.schedule.DayEntries[scope.dynamicPopover.n].TimeEntries[scope.dynamicPopover.m].EndMinute = scope.dynamicPopover.minute;
                }

                if (z == 0) {
                    scope.dynamicPopover.hour = scope.schedule.DayEntries[n].TimeEntries[m].StartHour;
                    scope.dynamicPopover.minute = scope.schedule.DayEntries[n].TimeEntries[m].StartMinute;
                }

                if (z == 1) {
                    scope.dynamicPopover.hour = scope.schedule.DayEntries[n].TimeEntries[m].EndHour;
                    scope.dynamicPopover.minute = scope.schedule.DayEntries[n].TimeEntries[m].EndMinute;
                }

                var v = scope.dynamicPopover.isOpen[n][m][z];
                scope.dynamicPopover.isOpen = isOpen();
                scope.dynamicPopover.isOpen[n][m][z] = !v;

                scope.dynamicPopover.n = n;
                scope.dynamicPopover.m = m;
                scope.dynamicPopover.z = z;
            };
        }
    };
}]);