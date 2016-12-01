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

            scope.checkTime = function (hour) {
                if (hour && scope.appointment.DateTime) {
                    var d = new Date(hour.Time);
                    return d.getTime() == scope.appointment.DateTime.getTime();
                } else {
                    return false;
                }
            };

            scope.selectDay = function (hour) {
                var d = new Date(hour.Time);
                if (scope.appointment.DateTime) {                    
                    if( d.getTime() == scope.appointment.DateTime.getTime())
                    {
                        scope.appointment.DateTime = null;
                    } else {
                        scope.appointment.DateTime = d;
                    }
                } else {
                    scope.appointment.DateTime = d;
                }                
            };

            scope.curDays = function () {
                scope.startDay = getMonday(new Date());
                scope.getDays();
            };

            scope.prevDays = function () {
                scope.startDay.setDate(scope.startDay.getDate() - 7);
                scope.getDays();
            };

            scope.nextDays = function () {
                scope.startDay.setDate(scope.startDay.getDate() + 7);
                scope.getDays();
            };

            scope.getDays = function () {
                if (scope.appointment) {

                    if (!scope.startDay) {
                        if (!scope.appointment.DateTime) {
                            scope.startDay = getMonday(new Date());
                        } else {
                            scope.startDay = new Date(scope.appointment.DateTime);
                        }
                    }

                    var id = scope.appointment.SubscriberId;
                    var year = scope.startDay.getFullYear();
                    var month = scope.startDay.getMonth() + 1;
                    var day = scope.startDay.getDate();
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

            scope.save = function () {
                if (scope.appointment.DateTime) {
                    swal({
                        title: "Are you sure?",
                        text: "Are you sure that you want to save this Apoointment?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "Yes",
                        confirmButtonColor: "#ec6c62"
                    }, function () {
                        $http({
                            method: 'POST',
                            url: baseUrl + 'api/appointments',
                            data: scope.appointment
                        }).then(function successCallback() {
                            swal("Success", "Appointment successfully created.", "success");                            
                        }, function errorCallback(response) {
                            if (response.status === -1) {
                                swal("Error", "Server unavailable!", "error");
                            } else {
                                swal("Error", response.statusText + ". " + response.data.Message, "error");
                            }
                        });
                    });
                }
            };
        }
    };
}]);