// src/api/axiosInstance.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Locking variables to avoid multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // If response is 401 and not a refresh attempt
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      // Prevent retrying refresh request infinitely
      originalRequest._retry = true;

      // If refresh token not available, reject
      const refresh_token = localStorage.getItem('refresh_token');
      const user_id = localStorage.getItem('user_id');
      if (!refresh_token || !user_id) {
        return Promise.reject(err);
      }

      if (isRefreshing) {
        // queue the request until refresh finishes
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const resp = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token,
          user_id,
        });

        const newToken = resp.data.access_token;
        localStorage.setItem('access_token', newToken);
        processQueue(null, newToken);

        // update header and retry original request
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Clearing stored tokens because refresh failed
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        isRefreshing = false;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
