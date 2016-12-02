'use strict';

/* Controllers */
angular.module('app')
.controller('ReceiveCallCtrl', ['$scope', '$http', '$routeParams', 'baseUrl',
function ($scope, $http, $routeParams, baseUrl) {

    $scope.callEntry = {};

    $scope.startCall = function () {
        if ($scope.callEntry.Line) {
            $http({
                method: 'GET',
                url: baseUrl + 'api/callentries/start/' + $scope.callEntry.Line
            }).then(function successCallback(response) {
                $scope.callEntry = response.data;                
            }, function errorCallback(response) {
                if (response.status === -1) {
                    swal("Error", "Server unavailable!", "error");
                } else {
                    swal("Error", response.statusText + ". " + response.data.Message, "error");
                }
            });
        }
    };

    $scope.findPerson = function () {
        if ($scope.callEntry.Person && $scope.callEntry.Person.PhonesInfo) {            
            $http({
                method: 'GET',
                url: baseUrl + 'api/people/phone/' + $scope.callEntry.Person.PhonesInfo
            }).then(function successCallback(response) {
                if (response.data.length > 0) {
                    $scope.people = response.data;
                    $('#myModal4').modal({
                        backdrop: "static"
                    });
                } else {
                    swal("Info", "no rows found!", "info");
                }
            }, function errorCallback(response) {
                if (response.status === -1) {
                    swal("Error", "Server unavailable!", "error");
                } else {
                    swal("Error", response.statusText + ". " + response.data.Message, "error");
                }
            });
        }
    };

    $scope.savePerson = function () {
        var method = 'POST';
        var url = baseUrl + 'api/people/';

        if ($scope.callEntry.Person.Id) {
            method = 'PUT';
            url += $scope.callEntry.Person.Id;
        }

        $http({
            method: method,
            url: url,
            data: $scope.callEntry.Person
        }).then(function successCallback(response) {
            $scope.callEntry.Person = response.data;
            swal("Success", "Person successfully saved.", "success");
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.stopCall = function () {
        if ($scope.callEntry.SubscriberId && $scope.callEntry.PersonId) {
            $http({
                method: 'POST',
                url: baseUrl + 'api/callentries',
                data: $scope.callEntry
            }).then(function successCallback(response) {
                $scope.callEntry = response.data
                swal({
                    title: "Success", 
                    text: "Call successfully saved.",
                    type: "success"
                }, function () {
                    $scope.callEntry = {};
                    $scope.$apply();
                });                
            }, function errorCallback(response) {
                if (response.status === -1) {
                    swal("Error", "Server unavailable!", "error");
                } else {
                    swal("Error", response.statusText + ". " + response.data.Message, "error");
                }
            });
        }
    };

    $scope.getAppointments = function () {
        if ($scope.callEntry.Person && $scope.callEntry.Person.Id) {
            $http({
                method: 'GET',
                url: baseUrl + 'api/appointments/person/' + $scope.callEntry.Subscriber.Id + '/' + $scope.callEntry.Person.Id
            }).then(function successCallback(response) {
                $scope.callEntry.Person.Appointments = response.data;
                $('#myModal2').modal({
                    backdrop: "static"
                });
            }, function errorCallback(response) {
                if (response.status === -1) {
                    swal("Error", "Server unavailable!", "error");
                } else {
                    swal("Error", response.statusText + ". " + response.data.Message, "error");
                }
            });
        }
    };

    $scope.selectRow = function (row) {
        $scope.callEntry.Person = row;
        $scope.callEntry.PersonId = row.Id;        
        $('#myModal4').modal('toggle');
    };

    $scope.newAppointment = function () {
        if ($scope.callEntry.SubscriberId && $scope.callEntry.PersonId) {
            $scope.appointment = {
                SubscriberId: $scope.callEntry.SubscriberId,
                PersonId: $scope.callEntry.PersonId
            };
            $scope.getDays();
            $('#myModal3').modal({
                backdrop: "static"
            });
        }
    };

    $scope.addAppointment = function () {
        var promise = $scope.saveAppointment();
        promise.then(function () {
            $('#myModal3').modal('toggle');
        });
    };

}]);