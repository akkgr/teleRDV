'use strict';

/* Controllers */
angular.module('app')
.controller('CallQueueCtrl', ['$scope', '$http', '$location', 'baseUrl',
  function ($scope, $http, $location, baseUrl) {

      var apiUrl = baseUrl + 'api/callentries/';
      
      $scope.getNewRow = function () {
          $http({
              method: 'GET',
              url: apiUrl + "new"
          }).then(function successCallback(response) {
              $scope.newRow = response.data;
          }, function errorCallback(response) {
              if (response.status === -1) {
                  swal("Error", "Server unavailable!", "error");
              } else {
                  swal("Error", response.statusText + ". " + response.data.Message, "error");
              }
          });
      };

      $scope.getData = function () {
          $http({
              method: 'GET',
              url: apiUrl
          }).then(function successCallback(response) {
              $scope.data = response.data;
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

      $scope.save = function () {
          $http({
              method: 'POST',
              url: apiUrl,
              data: $scope.newRow
          }).then(function successCallback(response) {
              $scope.newRow = response.data;
              swal("Success", "Call successfully saved.", "success");
              $scope.data.push($scope.newRow);
              $scope.getNewRow();
          }, function errorCallback(response) {
              if (response.status === -1) {
                  swal("Error", "Server unavailable!", "error");
              } else {
                  swal("Error", response.statusText + ". " + response.data.Message, "error");
              }
          });
      }

      $scope.getNewRow();
      $scope.getData();
  }]);