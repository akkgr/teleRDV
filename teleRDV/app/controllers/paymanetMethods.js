'use strict';

/* Controllers */
angular.module('app')
.controller('PaymentMethodsCtrl', ['$scope', '$http', '$location', 'baseUrl',
  function ($scope, $http, $location, baseUrl) {

      $scope.getData = function () {
          $http({
              method: 'GET',
              url: baseUrl + 'api/paymentmethods'
          }).then(function successCallback(response) {
              $scope.paymentmethods = response.data;
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
          $location.path('/paymentmethods/new');
      };

      $scope.edit = function () {
          if ($scope.selectedRow) {
              $location.path('/paymentmethods/' + $scope.selectedRow.Id);
          }
      };

      $scope.getData();

  }]);