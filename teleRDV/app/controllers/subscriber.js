'use strict';

/* Controllers */
angular.module('app')
.controller('SubscriberCtrl', ['$scope', '$http', '$routeParams', 'baseUrl', 'enumService', '$location',
function ($scope, $http, $routeParams, baseUrl, enumService, $location) {
    
      enumService.PhoneTypes().then(function (response) {
          $scope.phoneTypes = response.data;
      });
      
      enumService.AddressTypes().then(function (response) {
          $scope.addressTypes = response.data;
      });

      enumService.InfoTypes().then(function (response) {
          $scope.infoTypes = response.data;
      });      

      $scope.getData = function () {
          $http({
              method: 'GET',
              url: baseUrl + 'api/subscribers/' + $routeParams.id
          }).then(function successCallback(response) {
              $scope.subscriber = response.data;
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
          var url = baseUrl + 'api/subscribers';

          if ($scope.subscriber.Id) {
              method = 'PUT';
              url = baseUrl + 'api/subscribers/' + $scope.subscriber.Id;
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
                      url: baseUrl + 'api/subscribers/' + $scope.subscriber.Id
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

      $scope.addAddress = function () {
          $scope.subscriber.Addresses.push({});
      };

      $scope.deleteAddress = function (address) {
          var index = $scope.subscriber.Addresses.indexOf(address, 0);
          if (index > -1) {
              $scope.subscriber.Addresses.splice(index, 1);
          }
      };

      $scope.addPhone = function () {
          $scope.subscriber.Phones.push({});
      };

      $scope.deletePhone = function (phone) {
          var index = $scope.subscriber.Phones.indexOf(phone, 0);
          if (index > -1) {
              $scope.subscriber.Phones.splice(index, 1);
          }
      };

      $scope.addInfo = function () {
          $scope.subscriber.Infos.push({});
      };

      $scope.deleteInfo = function (phone) {
          var index = $scope.subscriber.Infos.indexOf(phone, 0);
          if (index > -1) {
              $scope.subscriber.Infos.splice(index, 1);
          }
      };

      $scope.addDivertPhone = function () {
          $scope.subscriber.DivertPhones.push({});
      };

      $scope.deleteDivertPhone = function (phone) {
          var index = $scope.subscriber.DivertPhones.indexOf(phone, 0);
          if (index > -1) {
              $scope.subscriber.DivertPhones.splice(index, 1);
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