'use strict';

angular.module('app')
.directive("appointment", ["$http", "enumService", "baseUrl", function ($http, enumService, baseUrl) {
    return {
        restrict: 'E',
        scope: {
            appointment: '=',
            getDays: '='
        },
        templateUrl: '/views/appointment.html',
        link: function (scope) {
            
            function getMonday(d) {
                d = new Date(d);
                var day = d.getDay(),
                    diff = d.getDate() - day + (day == 0 ? -6 : 1);
                return new Date(d.setDate(diff));
            }

            scope.curDays = function () {
                scope.appointment.DateTime = getMonday(new Date());
                scope.getDays();
            };

            scope.prevDays = function () {
                if (scope.appointment.DateTime) {
                    scope.appointment.DateTime.setDate(scope.appointment.DateTime.getDate() - 7);
                    scope.getDays();
                }
            };

            scope.nextDays = function () {
                if (scope.appointment.DateTime) {
                    scope.appointment.DateTime.setDate(scope.appointment.DateTime.getDate() + 7);
                    scope.getDays();
                }
            };

            scope.getDays = function () {
                if (scope.appointment) {

                    if (!scope.appointment.DateTime) {
                        scope.appointment.DateTime = getMonday(new Date());
                    }

                    console.log(scope.appointment.DateTime);
                    var id = scope.appointment.SubscriberId;
                    var year = scope.appointment.DateTime.getFullYear();
                    var month = scope.appointment.DateTime.getMonth() + 1;
                    var day = scope.appointment.DateTime.getDate();
                    $http({
                        method: 'GET',
                        url: baseUrl + 'api/subscribers/' + id + '/' + year + '/' + month + '/' + day
                    }).then(function successCallback(response) {
                        scope.days = response.data;
                    }, function errorCallback(response) {
                        if (response.status === -1) {
                            swal("Error", "Server unavailable!", "error");
                        } else {
                            swal("Error", response.statusText + ". " + response.data.Message, "error");
                        }
                    });
                }
            };

        }
    };
}]);