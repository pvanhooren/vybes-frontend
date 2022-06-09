import http from "./serviceVariables";

class profileService {
  constructor(token) {
    if (token !== null) {
      http.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      });
    }
  }

  baseUri = "/profiles/";

  getById = (profileId) => http.get(this.baseUri + `/id/${profileId}`)
}

export default profileService;
