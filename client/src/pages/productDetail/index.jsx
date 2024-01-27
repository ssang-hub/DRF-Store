import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import ProductReview from './review';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { AiFillStar } from 'react-icons/ai';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';
import { update_cart_number } from '../../store/reducers/auth.slice';
import Commitment from './commitment';
import ProductInfo from './productInfo';

function ProductDetail() {
  const { product_id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(undefined);
  const authState = useSelector(authSelector);

  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`/product/${product_id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  const setQuantityAction = (e) => {
    if (!e.target.value) {
      setQuantity(1);
    } else
      try {
        setQuantity(parseInt(e.target.value));
      } catch (error) {
        setQuantity(1);
      }
  };

  const minusAction = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addProduct = async (e) => {
    try {
      const { status } = await axiosPrivate.post('/cart/', { product: Number(product_id), quantity });
      status === 200 && toast.success('Thêm sản phẩm thành công', { position: 'bottom-right', theme: 'dark' });
      dispatch(update_cart_number(authState.cart_number + 1));
    } catch (error) {
      toast.error('Thêm sản phẩm thất bại', { position: 'bottom-right', theme: 'dark' });
    }
  };

  return (
    <>
      {product && (
        <>
          <Header />
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={'/'}>Trang chủ</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={''}>{product.category}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>
            <div className="row" style={{ marginTop: '50px' }}>
              <img className="col-xl-3" src={product.avatar} />

              <div className="col-xl-6">
                <h4 style={{ fontWeight: 'normal' }}>{product.name}</h4>
                <div>
                  <p className="d-flex m-3">Đã bán: 5</p>
                  <p className="d-flex m-3">
                    Đánh giá: 5 <AiFillStar style={{ color: 'yellow' }} />
                  </p>
                </div>
                <h3 className="m-3 d-flex" style={{ fontWeight: 'normal' }}>
                  {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                </h3>
                <p className="d-flex">So luong</p>
                <div className="group-input d-flex">
                  <button
                    className="btn btn-outline-primary mb-4"
                    id="btn-minus"
                    onClick={(e) => {
                      minusAction();
                    }}
                  >
                    -
                  </button>
                  <div className="form-outline mb-4 " style={{ width: '70px' }}>
                    <input
                      type="text"
                      className="form-control form-control-lg quantity"
                      name="quantity"
                      onChange={(e) => setQuantityAction(e)}
                      value={quantity}
                      required
                    />
                  </div>
                  <button
                    className="btn btn-outline-primary mb-4 btn-plus"
                    onClick={(e) => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                {authState.isAuthenticated ? (
                  <button className="btn btn-outline-danger px-5 py-3 float-left mt-4" onClick={(e) => addProduct(e)}>
                    Chọn mua
                  </button>
                ) : (
                  <button className="btn btn-outline-danger px-5 py-3 float-left mt-4" disabled>
                    Đăng nhập để mua
                  </button>
                )}
              </div>
              <Commitment />
            </div>
          </div>
          <ToastContainer />
          <ProductInfo product={product} />
          <div className="container p-0">
            <ProductReview is_authenticated={authState.isAuthenticated} product={product} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ProductDetail;
