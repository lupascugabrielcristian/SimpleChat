module.exports = userService;

function userService($log) {
  var user = {
    name: null
  };

  return {
    register: register,
    login: login,
    logout: logout,
    getLoggedInUser: getUser,
    isLoggedIn: isLoggedIn
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

  function logout() {
    localStorage.removeItem('user');
    user.name = null;
  }

  function isLoggedIn() {
    return user.name !== null;
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
