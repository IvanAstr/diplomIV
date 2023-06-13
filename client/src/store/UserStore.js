import { makeAutoObservable } from "mobx";

export default class UserStore {
  _isAuth = false;
  _user = {};

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  checkAuth() {
    const token = localStorage.getItem('jwtToken');
  
    if (token) {
      this._isAuth = true;
      // Здесь вы можете установить информацию о пользователе на основе токена, если необходимо
      this._token = token; // Сохранение токена
    } else {
      this._isAuth = false;
      this._user = {}; // Очистите информацию о пользователе, если необходимо
    }
  }

  setToken(token) {
    this._token = token;
    localStorage.setItem('jwtToken', token); // Сохранение токена в localStorage
  }

  logout() {
    this._isAuth = false;
    this._user = {};
    localStorage.removeItem('jwtToken');
  }

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}