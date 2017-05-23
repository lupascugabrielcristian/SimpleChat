module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('chat', {
      url: '/chat',
      component: 'chat'
    });
}
