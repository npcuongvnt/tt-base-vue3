import { AUTH } from "@/common/constant";
import api from "./api";
import AuthService from '@/service/auth.service';
import TokenService from "@/service/token.service";

const setup = (store) => {
  /**
   * attack vào request
   */
  api.interceptors.request.use(
    (req) => {
      let user = TokenService.getUser();
      if (user && user.accessToken && user.refreshToken) {
        req.headers[AUTH.AccessToken_Key] = user.accessToken;
        req.headers[AUTH.RefreshToken_Key] = user.refreshToken;
        req.headers[AUTH.Authorization_Key] = "Bearer " + user.accessToken;
      }

      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * attack vào response
   */
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {

          //set lại retry để chỉ retry 1 lần
          originalConfig._retry = true;

          try {
            const refreshTokenRes = await AuthService.refreshtoken({ refreshToken: TokenService.getLocalRefreshToken()});
            const { accessToken } = refreshTokenRes.data;

            store.dispatch('auth/refreshToken', accessToken);
            TokenService.updateLocalAccessToken(accessToken);

            return api(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
