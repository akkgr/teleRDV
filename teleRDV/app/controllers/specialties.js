'use strict';

/* Controllers */
angular.module('app')
.controller('SpecialtiesCtrl', ['$scope', '$http', '$location', 'baseUrl',
  function ($scope, $http, $location, baseUrl) {

      $scope.getData = function () {
          $http({
              method: 'GET',
              url: baseUrl + 'api/specialties'
          }).then(function successCallback(response) {
              $scope.specialties = response.data;
          }, function errorCallback(response) {
              if (response.status === -1) {
                  swal("Error", "Server unavailable!", "error");
              } else {
                  swal("Error", response.statusText + ". " + response.data.Message, "error");
              }
          });
      };

      $scope.selectRow = function (row) {
          $scope.selectedSpecialty = row;
      };

      $scope.add = function () {
          $location.path('/specialties/new');
      };

      $scope.edit = function () {
          if ($scope.selectedSpecialty) {
              $location.path('/specialties/' + $scope.selectedSpecialty.Id);
          }
      };

      $scope.getData();

  }]);