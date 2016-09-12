/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('BwafTM.pages.ui', [
    'BwafTM.pages.ui.typography',
    'BwafTM.pages.ui.buttons',
    'BwafTM.pages.ui.icons',
    'BwafTM.pages.ui.modals',
    'BwafTM.pages.ui.grid',
    'BwafTM.pages.ui.alerts',
    'BwafTM.pages.ui.progressBars',
    'BwafTM.pages.ui.notifications',
    'BwafTM.pages.ui.tabs',
    'BwafTM.pages.ui.slider',
    'BwafTM.pages.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui', {
          url: '/ui',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
