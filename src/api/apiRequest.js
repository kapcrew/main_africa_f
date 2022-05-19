import axios from "axios";
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || " http://45.137.64.34:4010"
// http://localhost:4002 "http://45.137.64.34:4002";
const apiRequest = axios.create({
  // withCredentials: true,
  baseURL: SERVER_DOMAIN,
});

// apiRequest.defaults.headers.post['Content-Type'] = 'multipart/form-data';

apiRequest.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  }
  return config;
});

apiRequest.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(refreshToken)
        const serverResponse = await apiRequest.post(
          "/auth/refresh",
          // { withCredentials: true },
          { refreshToken: refreshToken }
        );
        
        localStorage.setItem("accessToken", serverResponse.data.accessToken);
        console.log("refresh",serverResponse.data.user.walletId)
        localStorage.setItem("userAddress", "0:"+serverResponse.data.user.walletId);
        localStorage.setItem("refreshToken", serverResponse.data.refreshToken);

        return apiRequest.request(originRequest);
      } catch (error) {
        console.log("error",error)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userAddress");
        localStorage.removeItem("refreshToken");
      
      }
    }
    // When error code !== 401
    throw error;
  }
);

export default apiRequest;
