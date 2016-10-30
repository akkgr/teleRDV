'use strict';

angular.module('app')
.factory('localeService', ['localStorageService', '$translate', 'tmhDynamicLocale',
    function (localStorageService, $translate, tmhDynamicLocale) {
        var localeFactory = { language: { key: '', dateFormat: '' } };

        localeFactory.getLocale = function () {
            var lang = localStorageService.get('language');
            if (!lang) {
                lang = 'el';
            }
            localeFactory.setLocale(lang);
        }

        localeFactory.setLocale = function (key) {
            localeFactory.language.key = key;
            if (key === "el") {
                localeFactory.language.dateFormat = "dd/MM/yyyy HH:mm";
            } else {
                localeFactory.language.dateFormat = "MM/dd/yyyy HH:mm";
            }
            $translate.use(key);
            tmhDynamicLocale.set(key);
            localStorageService.set('language', key);
        }

        localeFactory.getLocale();

        return localeFactory;
    }]);