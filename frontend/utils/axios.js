import axios from 'axios';
import  store  from '../store/store.js';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI + '/v1';

axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logout on unauthorized
      store.dispatch({ type: 'auth/logout' });
      localStorage.removeItem('status');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default axios;

