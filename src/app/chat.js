module.exports = {
  template: require('./chat.html'),
  controller: controller,
  controllerAs: 'vm'
};

function controller($scope, $log, userService, $state, otherUsers) {
  var vm = this;
  vm.userMessage = null;
  vm.post = postUserMessage;
  vm.allChatText = '';

  if (!userService.getLoggedInUser()) {
    $state.go('login');
    return;
  }

  otherUsers.startChatting();
  startListening();

  function startListening() {
    $scope.$on('messageSent', function (event, messageObj) {
      var someUserMsg = new Message(messageObj.message, messageObj.user);
      postMessage(someUserMsg);
    });
  }

  function postMessage(messageObj) {
    if (!messageObj || !messageObj.content || messageObj.content.length === 0) {
      return;
    }
    vm.allChatText = addToChat(messageObj, vm.allChatText);
  }

  function postUserMessage() {
    if (vm.userMessage && vm.userMessage.length > 0) {
      var messageToAdd = composeMessage(vm.userMessage);
      vm.allChatText = addToChat(messageToAdd, vm.allChatText);
      vm.userMessage = null;
    }
  }

  function composeMessage(messageText) {
    var userName = userService.getLoggedInUser();
    return new Message(messageText, userName);
  }

  function addToChat(newMessage, currentChat) {
    var current = angular.copy(currentChat);
    var allChatText = current + newMessage.content;
    return allChatText;
  }

  function Message(message, user) {
    this.author = user;
    this.time = null;
    this.content = null;

    var currentDate = new Date();
    this.time = currentDate.getHours() + ':' + currentDate.getMinutes();
    this.content = user + '(' + this.time + '): ' + message + '\n';
  }
}
