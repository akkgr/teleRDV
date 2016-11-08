'use strict';
angular.module('app')
.service('enumService', ['$http', 'baseUrl', function ($http, baseUrl) {
    this.AddressTypes = function () {
        return $http.get(baseUrl + 'api/enum/address');
    };
    this.InfoTypes = function () {
        return $http.get(baseUrl + 'api/enum/info');
    };    
    this.PhoneTypes = function () {
        return $http.get(baseUrl + 'api/enum/phone');
    };
    this.WeekDays = function () {
        return $http.get(baseUrl + 'api/enum/weekdays');
    };
}]);