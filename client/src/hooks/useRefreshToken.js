import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import { lougout } from '../store/reducers/auth.slice';

function useRefreshToken() {
  const navigate = useNavigate();
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
      localStorage.removeItem(process.env.REACT_APP_APP_NAME);
      dispatch(lougout());
      navigate('/');
    }
  };
  return refreshToken;
}

export default useRefreshToken;
