'use strict';

/* Controllers */
angular.module('app')
.controller('SocialSecurityFundCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', '$location',
function ($scope, $http, $routeParams, baseUrl, $location) {

    var apiUrl = baseUrl + 'api/socialsecurityfunds/';

    $scope.getData = function () {
        if ($routeParams.id === "new") {
            $scope.item = {};
        } else {
            $http({
                method: 'GET',
                url: apiUrl + $routeParams.id
            }).then(function successCallback(response) {
                $scope.item = response.data;
                $('.selectpicker').selectpicker('refresh');
            }, function errorCallback(response) {
                if (response.status === -1) {
                    swal("Error", "Server unavailable!", "error");
                } else {
                    swal("Error", response.statusText + ". " + response.data.Message, "error");
                }
            });
        }
    };

    $scope.save = function () {
        var method = 'POST';
        var url = apiUrl;

        if ($scope.item.Id) {
            method = 'PUT';
            url = apiUrl + $scope.item.Id;
        }

        $http({
            method: method,
            url: url,
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            swal("Success", "Social Security Fund successfully saved.", "success");
            $location.path('/socialsecurityfunds');
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.delete = function () {
        if ($scope.item.Id) {
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to delete this Social Security Fund?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "Yes, delete it!",
                confirmButtonColor: "#ec6c62"
            }, function () {
                $http({
                    method: 'DELETE',
                    url: apiUrl + $scope.item.Id
                }).then(function successCallback() {
                    swal("Success", "Social Security Fund successfully deleted.", "success");
                    $location.path('/socialsecurityfunds');
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

    $scope.getData();
}]);