module.exports = {
  template: require('./chat.html'),
  controller: controller,
  controllerAs: 'vm'
};

function controller($scope, $log, userService, $state, otherUsers, messageProvider) {
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
      var someUserMsg = messageProvider.getMessageOf(messageObj.message, messageObj.user);
      postMessage(someUserMsg);
    });
  }

  function postMessage(messageObj) {
    if (!messageObj || !messageObj.content || messageObj.content.length === 0) {
      return;
    }
    playSound();
    vm.allChatText = addToChat(messageObj, vm.allChatText);
  }

  function postUserMessage() {
    if (vm.userMessage && vm.userMessage.length > 0) {
      playSound();
      var messageToAdd = messageProvider.getMessageOf(vm.userMessage, userService.getLoggedInUser());
      vm.allChatText = addToChat(messageToAdd, vm.allChatText);
      vm.userMessage = null;
    }
  }

  function addToChat(newMessage, currentChat) {
    var current = angular.copy(currentChat);
    var allChatText = current + newMessage.content;
    return allChatText;
  }

  function playSound() {
    var audio = new Audio('./app/click2.mp3');
    audio.play();
  }
}
