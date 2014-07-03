'use strict';

angular.module('AngularSemantic', [
    'ngRoute',
    'ngSemantic',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/modal', {
        templateUrl: 'views/modal.html',
        controller: 'ModalCtrl'
      })
      .otherwise({
        redirectTo: '/modal'
      });
  });