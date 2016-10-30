'use strict';

/* Controllers */
angular.module('app')
.controller('SubscribersCtrl', ['$scope', '$http', '$location', 'baseUrl',
  function ($scope, $http, $location, baseUrl) {

      $scope.getData = function () {
          $http({
              method: 'GET',
              url: baseUrl + 'api/subscribers'
          }).then(function successCallback(response) {
              $scope.subscribers = response.data;
          }, function errorCallback(response) {
              if (response.status === -1) {
                  swal("Error", "Server unavailable!", "error");
              } else {
                  swal("Error", response.statusText + ". " + response.data.Message, "error");
              }
          });
      };

      $scope.selectRow = function (row) {
          $scope.selectedSubscriber = row;
      };

      $scope.add = function () {
          $location.path('/subscribers/new');
      };

      $scope.edit = function () {
          if ($scope.selectedSubscriber) {
              $location.path('/subscribers/' + $scope.selectedSubscriber.Id);
          }
      };

      $scope.getSpecialties = function () {
          $http({
              method: 'GET',
              url: baseUrl + 'api/specialties/'
          }).then(function successCallback(response) {
              $scope.specialties = response.data;
              $('.selectpicker').selectpicker('refresh');
          }, function errorCallback(response) {
              if (response.status === -1) {
                  swal("Error", "Server unavailable!", "error");
              } else {
                  swal("Error", response.statusText + ". " + response.data.Message, "error");
              }
          });
      };

      $scope.getSpecialties();
      $scope.getData();

  }]);