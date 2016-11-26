'use strict';

/* Controllers */
angular.module('app')
.controller('SpecialtyCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', '$location',
function ($scope, $http, $routeParams, baseUrl, $location) {

    var apiUrl = baseUrl + 'api/specialties/';

    $scope.getData = function () {
        if ($routeParams.id === "new") {
            $scope.specialty = {};
        } else {
            $http({
                method: 'GET',
                url: apiUrl + $routeParams.id
            }).then(function successCallback(response) {
                $scope.specialty = response.data;
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

        if ($scope.specialty.Id) {
            method = 'PUT';
            url = apiUrl + $scope.specialty.Id;
        }

        $http({
            method: method,
            url: url,
            data: $scope.specialty
        }).then(function successCallback(response) {
            $scope.specialty = response.data;
            swal("Success", "Specialty successfully saved.", "success");
            $location.path('/specialties');
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.delete = function () {
        if ($scope.specialty.Id) {
            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to delete this Specialty?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "Yes, delete it!",
                confirmButtonColor: "#ec6c62"
            }, function () {
                $http({
                    method: 'DELETE',
                    url: apiUrl + $scope.specialty.Id
                }).then(function successCallback() {
                    swal("Success", "Specialty successfully deleted.", "success");
                    $location.path('/specialties');
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