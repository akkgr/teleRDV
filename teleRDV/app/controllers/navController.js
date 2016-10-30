'use strict';

/* Controllers */
angular.module('app')
.controller('NavCtrl', ['$scope', '$translate', 'authService', '$location', 'localStorageService', 'tmhDynamicLocale', 'localeService', '$http', 'baseUrl', '$window',
function ($scope, $translate, authService, $location, localStorageService, tmhDynamicLocale, localeService, $http, baseUrl, $window) {

    authService.fillAuthData();
    $scope.authentication = authService.authentication;

    $scope.language = localeService.language;

    $scope.changeLanguage = function (key) {
        localeService.setLocale(key);
        document.documentElement.setAttribute('lang', key);
    };

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/');
    };

    $scope.login = function () {
        authService.logOut();
        $location.path('/login');
    };

    $scope.changePassword = function () {
        $http({
            method: 'PUT',
            url: baseUrl + 'api/admin',
            data: $scope.user
        }).then(function successCallback() {
            swal("Success", "Password successfully changed.", "success");
            $('#changeMyPassword').modal('hide');
        }, function errorCallback(response) {
            if (response.status === -1) {
                swal("Error", "Server unavailable!", "error");
            } else {
                swal("Error", response.statusText + ". " + response.data.Message, "error");
            }
        });
    };

    $scope.print = function () {
        $http.get(baseUrl + 'api/reports/requests/2000/1/1/2016/12/31/0', { responseType: 'arraybuffer' })
            .success(function (response) {
                var file = new Blob([response], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                $window.open(fileURL);
            })
            .error(function (response) {
                var el = document.getElementById("pdf");
                el.data = null;
                if (response.status === -1) {
                    swal("Error", "Server unavailable!", "error");
                } else {
                    swal("Error", response.statusText + ". " + response.data.Message, "error");
                }
            });
    };

}]);