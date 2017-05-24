module.exports = userService;

function userService($log) {
  var user = {
    name: null
  };

  return {
    register: register,
    login: login,
    getLoggedInUser: getUser
  };

  function register(newUserName) {
    $log.log('Registering ' + newUserName);
    user.name = newUserName;
    save(newUserName);
  }

  function login(userName) {
    $log.log('Login in ' + userName);
    user.name = userName;
  }

  function getUser() {
    if (load()) {
      user.name = load();
    }
    return user.name;
  }

  function save(userName) {
    localStorage.setItem('user', userName);
  }

  function load() {
    return localStorage.getItem('user');
  }
}
