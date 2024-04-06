import { AUTH } from '@/common/constant';

class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem(AUTH.UserLocalStorage_Key));
      return user?.refreshToken;
    }
  
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem(AUTH.UserLocalStorage_Key));
      return user?.accessToken;
    }
  
    updateLocalAccessToken(token) {
      let user = JSON.parse(localStorage.getItem(AUTH.UserLocalStorage_Key));
      user.accessToken = token;
      localStorage.setItem(AUTH.UserLocalStorage_Key, JSON.stringify(user));
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem(AUTH.UserLocalStorage_Key));
    }
  
    setUser(user) {
      console.log(JSON.stringify(user));
      localStorage.setItem(AUTH.UserLocalStorage_Key, JSON.stringify(user));
    }
  
    removeUser() {
      localStorage.removeItem(AUTH.UserLocalStorage_Key);
    }
  }
  
  export default new TokenService();