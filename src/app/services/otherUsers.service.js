module.exports = otherUsers;

function otherUsers($rootScope, $interval, $http) {
  return {
    startChatting: startChatting
  };

  function startChatting() {
    $interval(function () {
      // sendThisMessageFromUser('bla bal', 'Cristi');
      getRandomName(getRandomWords);
    }, 4000);
  }

  function sendThisMessageFromUser(msg, user) {
    var toSend = {
      message: msg,
      user: user
    };
    $rootScope.$broadcast('messageSent', toSend);
  }

  function getRandomWords(randomUserName) {
    var requestStr = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
    $http.get(requestStr).then(function (result) {
      var phrase = result.data.slice(0, 3).reduce(function (acc, randomWordObj) {
        return acc + randomWordObj.word + ' ';
      }, '');
      sendThisMessageFromUser(phrase, randomUserName);
    });
  }

  function getRandomName(getWordsFc) {
    var link = 'https://randomuser.me/api/';
    $http.get(link).then(function (result) {
      var name = result.data.results[0].name;
      var userName = name.first + ' ' + name.last;
      getWordsFc(userName);
    });
  }
}
