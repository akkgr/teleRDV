'use strict';
angular.module('app')
.service('enumService', ['$http', 'baseUrl', function ($http, baseUrl) {
    this.AddressTypes = function () {
        return $http.get(baseUrl + 'api/enum/AddressType');
    };
    this.AppointmentStatuses = function () {
        return $http.get(baseUrl + 'api/enum/AppointmentStatus');
    };
    this.CallReasons = function () {
        return $http.get(baseUrl + 'api/enum/CallReason');
    };
    this.CallStatuses = function () {
        return $http.get(baseUrl + 'api/enum/CallStatus');
    };
    this.CallTypes = function () {
        return $http.get(baseUrl + 'api/enum/CallType');
    };
    this.InfoTypes = function () {
        return $http.get(baseUrl + 'api/enum/InfoType');
    };
    this.PhoneTypes = function () {
        return $http.get(baseUrl + 'api/enum/PhoneType');
    };
    this.WeekDays = function () {
        return $http.get(baseUrl + 'api/enum/DayOfWeek');
    };
}]);