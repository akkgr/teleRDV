'use strict';

/* Controllers */
angular.module('app')
.controller('SocialSecurityFundsCtrl', ['$scope', '$http', '$location', 'baseUrl',
  function ($scope, $http, $location, baseUrl) {

      var apiUrl = baseUrl + 'api/socialsecurityfunds/';

      $scope.getData = function () {
          $http({
              method: 'GET',
              url: apiUrl
          }).then(function successCallback(response) {
              $scope.items = response.data;
          }, function errorCallback(response) {
              if (response.status === -1) {
                  swal("Error", "Server unavailable!", "error");
              } else {
                  swal("Error", response.statusText + ". " + response.data.Message, "error");
              }
          });
      };

      $scope.selectRow = function (row) {
          $scope.selectedRow = row;
      };

      $scope.add = function () {
          $location.path('/socialsecurityfunds/new');
      };

      $scope.edit = function () {
          if ($scope.selectedRow) {
              $location.path('/socialsecurityfunds/' + $scope.selectedRow.Id);
          }
      };

      $scope.getData();
  }]);