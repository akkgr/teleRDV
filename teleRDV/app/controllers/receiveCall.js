'use strict';

/* Controllers */
angular.module('app')
.controller('ReceiveCallCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', '$location',
function ($scope, $http, $routeParams, baseUrl, $location) {

    var apiUrl = baseUrl + 'api/callentries/start/';

    $scope.callEntry = {};
    $scope.subscriber = {};

    $scope.startCall = function () {
        if ($scope.callEntry.Line) {
            $scope.getData();
        }
    };

    $scope.getData = function () {
        $http({
            method: 'GET',
            url: apiUrl + $scope.callEntry.Line
        }).then(function successCallback(response) {
            $scope.callEntry = response.data.CallEntry;
            $scope.subscriber = response.data.Subscriber;
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };
}]);