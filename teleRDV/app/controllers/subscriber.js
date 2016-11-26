'use strict';

/* Controllers */
angular.module('app')
.controller('SubscriberCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', '$location',
function ($scope, $http, $routeParams, baseUrl, $location) {

    var apiUrl = baseUrl + 'api/subscribers/';

    $scope.getData = function () {
        $http({
            method: 'GET',
            url: apiUrl + $routeParams.id
        }).then(function successCallback(response) {
            $scope.subscriber = response.data;
            $('.selectpicker').selectpicker('refresh');
            if ($scope.subscriber.Specialty) {
                $('.selectpicker').selectpicker('val', $scope.subscriber.Specialty.Id);
            }
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.save = function () {
        var method = 'POST';
        var url = apiUrl;

        if ($scope.subscriber.Id) {
            method = 'PUT';
            url = apiUrl + $scope.subscriber.Id;
        }

        $http({
            method: method,
            url: url,
            data: $scope.subscriber
        }).then(function successCallback(response) {
            $scope.subscriber = response.data;
            swal("Success", "Contact successfully saved.", "success");
            $location.path('/subscribers');
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.delete = function () {
        if ($scope.subscriber.Id) {
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to delete this contact?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "Yes, delete it!",
                confirmButtonColor: "#ec6c62"
            }, function () {
                $http({
                    method: 'DELETE',
                    url: apiUrl + $scope.subscriber.Id
                }).then(function successCallback() {
                    swal("Success", "Subscriber successfully deleted.", "success");
                    $location.path('/subscribers');
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

    $scope.getSpecialties = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'api/specialties/'
        }).then(function successCallback(response) {
            $scope.specialties = response.data;
            $scope.getData();
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.getSpecialties();
}]);