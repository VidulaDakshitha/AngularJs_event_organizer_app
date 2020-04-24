'use strict';

// Declare app level module which depends on views, and core components
// let app = angular.module('EventApp', [
//   'ngRoute',
//   'EventApp.version',
//   'ngMaterial',
//   'ngMessages',
// ]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
//   $locationProvider.hashPrefix('!');
//
// }]);
let app=angular.module('EventApp',['ngMaterial','ngMessages','md.time.picker']).run(function($rootScope) {
    $rootScope.events = [];
    $rootScope.deletedEvents1 = [];
    $rootScope.calDate=new Date();
    $rootScope.globalValue="";
    $rootScope.globalTime="";
    $rootScope.booleanck=false;
    $rootScope.idVal="";
    $rootScope.count=0;
    $rootScope.latestDate="";
    $rootScope.daysLeft="";
    $rootScope.hoursLeft="";
    $rootScope.minutesLeft="";
    $rootScope.secondsLeft="";
    $rootScope.latestObject="";
    $rootScope.deletedEvents="";
    $rootScope.counterval=0;
    $rootScope.timerValue=1000;
    $rootScope.todaysDate="";

    });

