'use strict';

/* Controllers */
angular.module('app')
.controller('PaymentMethodCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', '$location',
function ($scope, $http, $routeParams, baseUrl, $location) {

    var apiUrl = baseUrl + 'api/paymentmethods/'

    $scope.getData = function () {
        if ($routeParams.id === "new") {
            $scope.paymentmethod = {};
        } else {
            $http({
                method: 'GET',
                url: apiUrl + $routeParams.id
            }).then(function successCallback(response) {
                $scope.paymentmethod = response.data;
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

        if ($scope.paymentmethod.Id) {
            method = 'PUT';
            url = apiUrl + $scope.paymentmethod.Id;
        }

        $http({
            method: method,
            url: url,
            data: $scope.paymentmethod
        }).then(function successCallback(response) {
            $scope.paymentmethod = response.data;
            swal("Success", "Payment Method successfully saved.", "success");
            $location.path('/paymentmethods');
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.delete = function () {
        if ($scope.paymentmethod.Id) {
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to delete this Payment Method?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "Yes, delete it!",
                confirmButtonColor: "#ec6c62"
            }, function () {
                $http({
                    method: 'DELETE',
                    url: apiUrl + $scope.paymentmethod.Id
                }).then(function successCallback() {
                    swal("Success", "Payment Method successfully deleted.", "success");
                    $location.path('/paymentmethods');
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