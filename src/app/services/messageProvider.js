module.exports = messageProvider;

function messageProvider() {
  return {
    getMessageOf: getMessageOf
  };

  function getMessageOf(content, user) {
    return new Message(content, user);
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
