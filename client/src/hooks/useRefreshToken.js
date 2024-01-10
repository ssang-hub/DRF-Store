import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { lougout } from '../store/reducers/auth.slice';
function useRefreshToken() {
  const dispatch = useDispatch();
  const refreshToken = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: '/auth/refresh_token/',
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem(process.env.REACT_APP_APP_NAME)).refresh_token}` },
      });
      return data;
    } catch (error) {
      // dispatch(lougout());
      // window.location.reload();
    }
  };
  return refreshToken;
}

export default useRefreshToken;
