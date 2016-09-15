  (function () {
  'use strict';
  angular.module('BwafTM.pages.charts.amCharts').
      factory('ReportService', ['$http', '$q', 'RouteQuery', function($http, $q, routeQuery) {
          return routeQuery.get('http://10.1.0.37:1337/BuildCount');
      }]);
})();