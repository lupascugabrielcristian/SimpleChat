module.exports = {
  template: require('./login.html'),
  controller: controller,
  controllerAs: 'vm'
};

/* @ngInject */
function controller($log, $state, userService) {
  var vm = this;
  vm.userName = null;

  vm.login = function () {
    if (validate()) {
      $log.log('Loging in as [' + vm.userName + ']');
      userService.login(vm.userName);
      $state.go('chat');
    } else {
      $log.warn('Invalid name');
    }
  };

  function validate() {
    return !(!vm.userName || vm.userName.length === 0);
  }
}
