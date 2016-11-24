'use strict';

angular.module('app')
.directive("faqs", [ function () {
    return {
        restrict: 'E',
        scope: {
            title: '=',
            faqs: '=',
            locked: '='
        },
        templateUrl: '/views/faqs.html',
        link: function (scope) {

            scope.addFaq = function () {
                scope.faqs.push({});
            };

            scope.deleteFaq = function (faq) {
                var index = scope.faqs.indexOf(faq, 0);
                if (index > -1) {
                    scope.faqs.splice(index, 1);
                }
            };
        }
    };
}]);