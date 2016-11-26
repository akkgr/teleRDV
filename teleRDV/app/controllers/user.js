'use strict';

/* Controllers */
angular.module('app')
.controller('UserCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', '$location',
function ($scope, $http, $routeParams, baseUrl, $location) {
    $scope.getRoles = function () {
        $http({
            method: 'GET',
            url: baseUrl + 'api/roles/'
        }).then(function successCallback(response) {
            $scope.roles = response.data;
            $('.selectpicker').selectpicker('refresh');
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.getData = function () {
        if ($routeParams.id === "new") {
            $scope.isNew = true;
            $scope.user = { Roles: [] };
            $scope.getRoles();
        } else {
            $scope.isNew = false;
            $http({
                method: 'GET',
                url: baseUrl + 'api/users/' + $routeParams.id
            }).then(function successCallback(response) {
                $scope.user = response.data;
                $scope.getRoles();
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
        var url = baseUrl + 'api/users';

        if ($scope.user.Id) {
            method = 'PUT';
            url = baseUrl + 'api/users/' + $scope.user.Id;
        }

        $http({
            method: method,
            url: url,
            data: $scope.user
        }).then(function successCallback(response) {
            $scope.user = response.data;
            swal("Success", "Contact successfully saved.", "success");
            $location.path('/users');
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.delete = function () {
        if ($scope.user.Id) {
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
                    url: baseUrl + 'api/users/' + $scope.user.Id
                }).then(function successCallback() {
                    swal("Success", "Contact successfully deleted.", "success");
                    $location.path('/users');
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

    $scope.changePassword = function () {
        $http({
            method: 'POST',
            url: baseUrl + 'api/admin',
            data: $scope.user
        }).then(function successCallback() {
            swal("Success", "Password successfully changed.", "success");
            $('#changeUserPassword').modal('hide');
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.getRoles();
    $scope.getData();
}]);