'use strict';

angular.module('myFlickr.auth', [
  'myFlickr.constants',
  'myFlickr.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
