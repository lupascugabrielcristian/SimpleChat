var angular = require('angular');

require('angular-ui-router');
var routesConfig = require('./routes');

var login = require('./app/login');
var chat = require('./app/chat');
var userService = require('./app/services/user.service');
var otherUsers = require('./app/services/otherUsers.service');
var customEnter = require('./app/directives/customEnter.directive');
var messageProvider = require('./app/services/messageProvider');

require('./index.css');

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .component('login', login)
  .component('chat', chat)
  .factory('userService', userService)
  .factory('otherUsers', otherUsers)
  .factory('messageProvider', messageProvider)
  .directive('customEnter', customEnter);
