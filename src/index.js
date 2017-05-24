var angular = require('angular');

var techsModule = require('./app/techs/index');
require('angular-ui-router');
var routesConfig = require('./routes');

var main = require('./app/main');
var header = require('./app/header');
var title = require('./app/title');
var footer = require('./app/footer');
var login = require('./app/login');
var chat = require('./app/chat');
var userService = require('./app/services/user.service');
var otherUsers = require('./app/services/otherUsers.service');
var customEnter = require('./app/directives/customEnter.directive');

require('./index.css');

angular
  .module('app', [techsModule, 'ui.router'])
  .config(routesConfig)
  .component('app', main)
  .component('fountainHeader', header)
  .component('fountainTitle', title)
  .component('fountainFooter', footer)
  .component('login', login)
  .component('chat', chat)
  .factory('userService', userService)
  .factory('otherUsers', otherUsers)
  .directive('customEnter', customEnter);
