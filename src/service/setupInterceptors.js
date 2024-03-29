import api from "./api";
import { AUTH } from "../common/constant";

const setup = (store) => {
  /**
   * attack vào request
   */
  api.interceptors.request.use(
    (req) => {
      let user = JSON.parse(localStorage.getItem(AUTH.USERLOCALSTORAGE));
      if (user && user.accessToken && user.refreshToken) {
        req.headers[AUTH.HTTP_AccessToken] = user.accessToken;
        req.headers[AUTH.HTTP_RefreshToken] = user.refreshToken;
        req.headers[AUTH.Authorization] = "Bearer " + user.accessToken;
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
          originalConfig._retry = true;

          try {
            const rs = await api.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            store.dispatch("auth/refreshToken", accessToken);
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
