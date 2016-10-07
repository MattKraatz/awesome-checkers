"use strict";

let app = angular.module('mainApp',['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/',{
      controller: 'playCtrl',
      templateUrl: 'src/partials/play.html'
    })
    .otherwise('/')
})
