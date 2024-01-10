import { useState, useEffect } from 'react';
import clsx from 'clsx';

import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { BsTrash } from 'react-icons/bs';
import Footer from '../../components/footer';
import Header from '../../components/header';
import DeleteModal from './Deletemodal';
import CreateOrderModal from './CreateOrder';
import style from './style.module.scss';

function MyCart() {
  const [items, setItems] = useState(undefined);
  const [cartItemSelect, setCartItemSelect] = useState([]);
  const [cartItemDelete, setCartItemDelete] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState(0);

  const axiosPrivate = useAxiosPrivate();
  const authState = useSelector(authSelector);

  useEffect(() => {
    if (authState.isAuthenticated) {
      getCartItems();
    }
  }, []);

  const getCartItems = async () => {
    const { data } = await axiosPrivate.get('/cart/');
    setItems(data.results);
    setTotalPrice(data.results.reduce((totalPrice, item) => totalPrice + Number(item.caculate_price), 0));
    setCartItemSelect(data.results.map((item) => item.id));
  };

  const changeQuantityInput = async (e, cartItem) => {
    const { value } = e.target;
    try {
      await axiosPrivate.put(`/cart/${cartItem.id}`, { quantity: value });
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItemMethod = async () => {
    await axiosPrivate.delete(`/cart/${cartItemDelete}`);
    window.location.reload();
  };

  const selectCartItem = (e, cartItemId) => {
    cartItemSelect.includes(cartItemId)
      ? setCartItemSelect((prevState) => prevState.map((item) => item !== cartItemId))
      : setCartItemSelect((prevState) => prevState.push(items));
  };
  return (
    <>
      {items && (
        <div>
          <Header />
          {/* <Category /> */}
          <div className={clsx([style['background-color-page']], 'pb-5')}>
            <h4 className="d-flex container pt-5">GIỎ HÀNG</h4>
            <div className="container bg-light">
              <div className="row cpl-xl-8">
                <table className="table">
                  <thead>
                    <td className="col-xl-2">Chọn tất cả</td>
                    <td className="col-xl-3">Tiêu đề sách</td>
                    <td className="col-xl-2">Số lượng</td>
                    <td className="col-xl-2">Đơn giá</td>
                    <td className="col-xl-2"></td>
                  </thead>
                </table>
              </div>
              <div className="col-xl-4"></div>
            </div>
            <div className="row container m-auto pt-4">
              <div className={clsx('col-xl-8', 'bg-light', 'mr-3', 'pb-4')}>
                <div className="mt-5">
                  <table className="table">
                    <tbody>
                      {items.map((item) => (
                        <tr className="d-flex my-5 " key={item.id}>
                          <div className="form-check">
                            <td className="center-itemCart border-0">
                              <input className="mr-4 " type="checkbox" defaultChecked onChange={(e) => selectCartItem(e, item.id)} />
                            </td>
                          </div>
                          <td className="center-itemCart border-0">
                            <div>
                              <img className="image-size-mini" src={item.product.avatar} alt="" />
                            </div>
                          </td>
                          <td colSpan={2} className="center-itemCart border-0">
                            <h6>{item.product.name}</h6>
                          </td>
                          <td className="center-itemCart border-0">
                            <div className="group-input d-flex quantity">
                              {/* <button className="btn btn-outline-primary mb-4 py-1 px-2 quantity-remove quantity-button" onClick={(e) => updateQuantity(e, "-", item.id, item.quantity)}>
                                -
                              </button> */}
                              <div className="form-outline mb-4 cartQuantitySize">
                                <input
                                  type="number"
                                  className="form-control form-control-lg quantity cartQuantitySize"
                                  name="quantity"
                                  min={1}
                                  defaultValue={item.quantity}
                                  onChange={(e) => changeQuantityInput(e, item)}
                                  required
                                />
                              </div>
                              {/* <button
                                className="btn btn-outline-primary mb-4 btn-plus py-1 px-2 quantity-add quantity-button"
                                // id="btn-plus"
                                onClick={(e) => updateQuantity(e, "+", item.id, item.quantity)}
                              >
                                +
                              </button> */}
                            </div>
                          </td>
                          <td className="center-itemCart border-0">
                            <h6 className="ml-3 col-xl-2">{item.caculate_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</h6>
                          </td>
                          <td className="center-itemCart border-0">
                            <h6 className="ml-3 col-xl-2 ">
                              <div
                                className="btn btn-outline-danger hover-pointer"
                                onClick={() => {
                                  setCartItemDelete(item.id);
                                }}
                                data-toggle="modal"
                                data-target="#CartItemDelete"
                              >
                                <BsTrash />
                              </div>
                            </h6>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-xl-3 bg-light ml-3">
                <div className="d-flex justify-content-around">
                  <div>Giao tới</div>
                  <div>Thay đổi</div>
                </div>
                <div className="d-flex my-5">
                  <div>{authState.user.fullname}</div>
                  {/* <div>{information.numberPhone}</div> */}
                </div>
                <div className="mt-3">
                  Tổng số tiền:
                  <h5 id="totalPrice">{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</h5>
                </div>
                <div>
                  <button className="btn btn-outline-primary" data-toggle="modal" data-target="#CreateOrderModal">
                    Đặt Hàng
                  </button>
                </div>
              </div>
            </div>
            {/* <div></div> */}
          </div>
          <DeleteModal deleteCartItemMethod={deleteCartItemMethod} />
          <CreateOrderModal cartItemSelect={cartItemSelect} />
          <Footer />
        </div>
      )}
    </>
  );
}

export default MyCart;
