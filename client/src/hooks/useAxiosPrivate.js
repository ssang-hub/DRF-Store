import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '../store/reducers/auth.slice';
import { authSelector } from '../store/selectors';
import useRefreshToken from './useRefreshToken';

function useAxiosPrivate() {
  const handleRefreshToken = useRefreshToken();
  const authState = useSelector(authSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authState.isAuthenticated) {
      // set token to header http request
      const requestInterceptor = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${authState.user.token}`;
          }
          return config;
        },
        (error) => Promise.reject(error),
      );
      // call  refresh token
      const responseInterceptor = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error.config;
          if (error.response.status === 403) {
            const new_data = await handleRefreshToken();
            prevRequest.headers['Authorization'] = `Bearer ${new_data.token}`;
            dispatch(refreshToken(new_data));
            localStorage.setItem(
              process.env.REACT_APP_APP_NAME,
              JSON.stringify({ token: new_data.token, refresh_token: new_data.refresh_token }),
            );
            return axiosPrivate(prevRequest);
          }
        },
      );
      return () => {
        axiosPrivate.interceptors.request.eject(requestInterceptor);
        axiosPrivate.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [authState]);
  return axiosPrivate;
}

export default useAxiosPrivate;
