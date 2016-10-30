'use strict';

angular.module('app')
    .directive("stringToDate", function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelController) {
                ngModelController.$formatters.push(function (data) {
                    if (!data) {
                        return null;
                    }
                    var d = new Date(data);
                    return d;
                });
            }
        };
    });