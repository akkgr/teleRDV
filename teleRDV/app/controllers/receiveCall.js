'use strict';

/* Controllers */
angular.module('app')
.controller('ReceiveCallCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', 'enumService', '$location',
function ($scope, $http, $routeParams, baseUrl, enumService, $location) {

    $scope.callEntry = {};
    $scope.callEntry = {};

    $scope.startCall = function () {
        $scope.getData();
    };

    $scope.getData = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'api/phonecall/start/' + $scope.callEntry.Line
        }).then(function successCallback(response) {
            $scope.callEntry = response.data;            
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };
    
}]);