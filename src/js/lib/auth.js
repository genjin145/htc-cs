class Auth {
  constructor(callback = new Function()) {
    this._callback = callback;
    this._callback();
  }

  login(options = {}) {
    let login = options.login || 'Anonymous',
        password = options.password || '';

    let obj = {
      login: login,
      password: password
    };

    localStorage.setItem('user', JSON.stringify(obj));
    this._callback();
  }

  logout() {
    localStorage.removeItem('user');
  }

  authorized() {
    if (localStorage.getItem('user')) return true;
    return false;
  }

  renameLogin(name) {
    let obj = JSON.parse(localStorage.getItem('user')),
        newObj = {
          login: name,
          password: obj.password
        };

    localStorage.setItem('user', JSON.stringify(newObj));
  }

  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }
}

export default Auth;