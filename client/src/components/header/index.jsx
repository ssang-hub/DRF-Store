import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';
import { lougout, updateUser, update_cart_number } from '../../store/reducers/auth.slice';

import clsx from 'clsx';

import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { FaReact } from 'react-icons/fa';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import style from './style.module.scss';
import Auth from '../../pages/auth';

const Header = () => {
  const [user, setUser] = useState(undefined);
  const [searchKey, setSearchKey] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const authState = useSelector(authSelector);

  useEffect(() => {
    if (authState.isAuthenticated) {
      const get_my_info = async () => {
        // const { data } = await axiosPrivate.get('/auth/my_info/');
        // dispatch(updateUser(authSelector.user));
        setUser(authSelector.user);
      };
      const getCountItem = async () => {
        const { data } = await axiosPrivate.request({ method: 'GET', url: '/cart/get_count_cart_items' });
        dispatch(update_cart_number(data));
      };
      get_my_info();
      getCountItem();
    }
  }, []);

  const logoutMethod = () => {
    dispatch(lougout());
    localStorage.removeItem(process.env.REACT_APP_APP_NAME);
    window.location.reload();
  };

  const searchMethod = (e) => {
    e.preventDefault();
    navigate(`/search_product/search_key=${searchKey}`);
  };

  return (
    <div style={{ backgroundColor: '#1a94ff' }}>
      <div className="d-flex justify-content-around py-4 px-4 container">
        <Link to={'/'} className="mt-2" style={{ color: 'white' }}>
          <FaReact style={{ width: '30px', height: '30px' }} />
          SSTORE
        </Link>
        <div style={{ width: '60%' }}>
          <div className="form-outline mb-4 d-flex ">
            <form className="form-control form-control-lg" id="form_search" onSubmit={searchMethod}>
              <input
                type="text"
                id="input_search"
                className={clsx('w-100', 'm-0', style.input_search)}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Tìm Kiếm sản phẩm, danh mục, thương hiệu mà bạn mong muốn"
              />
            </form>
            <button form="form_search" type="submit" className="btn btn-primary w-25">
              <AiOutlineSearch style={{ fontSize: '20px' }} />
              Tim Kiem
            </button>
          </div>
        </div>
        {!authState.isAuthenticated ? (
          <>
            <div style={{ color: 'white', fontSize: '15px' }}>
              <AiOutlineUser style={{ fontSize: '30px' }} />
              <div type="button" className="d-inline-block" data-toggle="modal" data-target="#LoginModal">
                Đăng Nhập/Đăng Ký
              </div>
            </div>
            <div className={clsx('m-0', style.cart)}>
              <AiOutlineShoppingCart style={{ fontSize: '30px' }} />
              Giỏ Hàng
            </div>
            <Auth />
          </>
        ) : (
          <>
            {' '}
            <div className="dropdown">
              <div className={clsx([style['btn-user'], 'dropdown-toggle'])} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <AiOutlineUser style={{ fontSize: '30px' }} />
                {authState.user.fullname}
              </div>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div className="dropdown-item">Thông tin cá nhân</div>
                {authState.user.is_superuser && (
                  <>
                    <Link className="dropdown-item" to={'/productManager'}>
                      Trang quản lý
                    </Link>
                  </>
                )}
                <Link className="dropdown-item" to={'/myOrder'}>
                  Đơn hàng của tôi
                </Link>
                <button className="logout-btn" onClick={() => logoutMethod()} style={{ color: 'red' }}>
                  Đăng xuất
                </button>
              </div>
            </div>
            {authState.isAuthenticated ? (
              <Link to={'/myCart'} className={clsx('m-0', style.cart, 'd-flex', 'text-decoration-none')}>
                <AiOutlineShoppingCart style={{ fontSize: '30px' }} />
                <p className="mt-3" id="numberCartItem">
                  {authState.cart_number}
                </p>
                Giỏ Hàng
              </Link>
            ) : (
              <AiOutlineShoppingCart style={{ fontSize: '30px' }} />
            )}
            {/* <Auth /> */}
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
