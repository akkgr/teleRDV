'use strict';

/* Controllers */
angular.module('app')
.controller('ReceiveCallCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', '$location',
function ($scope, $http, $routeParams, baseUrl, $location) {

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
                url: baseUrl + 'api/people/' + $scope.callEntry.Subscriber.Id + '/' + $scope.callEntry.Person.PhonesInfo + '/new'
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

    $scope.stopCall = function () {
        if ($scope.callEntry.Line) {
            $http({
                method: 'POST',
                url: baseUrl + 'api/callentries',
                data: $scope.callEntry
            }).then(function successCallback(response) {
                $scope.callEntry = response.data
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
                url: baseUrl + 'api/people/' + $scope.callEntry.Subscriber.Id + '/' + $scope.callEntry.Person.PhonesInfo + '/' + $scope.callEntry.Person.Id
            }).then(function successCallback(response) {
                $scope.callEntry.Person = response.data;
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
        $('#myModal4').modal('toggle');
    };

}]);