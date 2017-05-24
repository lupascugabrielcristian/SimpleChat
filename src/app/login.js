module.exports = {
  template: require('./login.html'),
  controller: controller,
  controllerAs: 'vm'
};

/* @ngInject */
function controller($log, $state, userService) {
  var vm = this;
  vm.userName = userService.getLoggedInUser();
  vm.login = login;

  function login() {
    if (validate()) {
      $log.log('Loging in as [' + vm.userName + ']');
      userService.register(vm.userName);
      goToChatPage();
    } else {
      $log.warn('Invalid name');
    }
  }

  function goToChatPage() {
    $state.go('chat');
  }

  function validate() {
    return !(!vm.userName || vm.userName.length === 0);
  }
}
