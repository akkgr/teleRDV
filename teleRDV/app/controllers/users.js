'use strict';

/* Controllers */
angular.module('app')
.controller('UsersCtrl', ['$scope', '$http', '$location', 'baseUrl',
  function ($scope, $http, $location, baseUrl) {
      $scope.getData = function () {
          $http({
              method: 'GET',
              url: baseUrl + 'api/users'
          }).then(function successCallback(response) {
              $scope.users = response.data;
          }, function errorCallback(response) {
              if (response.status === -1) {
                  swal("Error", "Server unavailable!", "error");
              } else {
                  swal("Error", response.statusText + ". " + response.data.Message, "error");
              }
          });
      };

      $scope.selectRow = function (user) {
          $scope.selectedUser = user;
      };

      $scope.add = function () {
          $location.path('/users/new');
      };

      $scope.edit = function () {
          if ($scope.selectedUser) {
              $location.path('/users/' + $scope.selectedUser.Id);
          }
      };

      $scope.getData();
  }]);