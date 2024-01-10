import clsx from 'clsx';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../../components/header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import style from './style.module.scss';
import DeleteOrder from './DeleteOrder';
import OrderDetail from '../../components/OrderDetail';
import Payment from '../../components/payment';
import Footer from '../../components/footer';
import { authSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MyOrders() {
  const [status, setstatus] = useState('pending');
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState(undefined);
  const [paymentOrder, setPaymentOrder] = useState(undefined);

  const [clientSecret, setClientSecret] = useState('');

  const authState = useSelector(authSelector);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axiosPrivate.request({ method: 'GET', url: `/order/`, params: { status: status } });
      // const order_objects = Object.keys(data).map((key) => data[key]);
      setOrders(data.results);
    };
    getOrders();
  }, [status]);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/');
    }

    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const { data } = await axiosPrivate.request({
          url: `${process.env.REACT_APP_BACKEND}/payment/`,
          method: 'POST',
          data: { order_id: paymentOrder },
        });
        setClientSecret(data);
      } catch (error) {
        console.log(error);
      }
    };
    paymentOrder && createPaymentIntent();
  }, [paymentOrder]);

  return (
    <div className={clsx([style['background-color-page']], 'pb-3')}>
      <Header />
      <div className={clsx('container', 'mt-5', [style['content-bg']], 'p-2')}>
        <div className="d-flex justify-content-around">
          <div className={clsx('btn', { [style['active-status']]: status === 'pending' })} onClick={(e) => setstatus('pending')}>
            Chờ xác nhận
          </div>
          <div className={clsx('btn', { [style['active-status']]: status === 'delevery' })} onClick={(e) => setstatus('delevery')}>
            Đang giao hàng
          </div>
          <div className={clsx('btn', { [style['active-status']]: status === 'completed' })} onClick={(e) => setstatus('completed')}>
            Đã giao hàng
          </div>
          <div className={clsx('btn', { [style['active-status']]: status === 'destroyed' })} onClick={(e) => setstatus('destroyed')}>
            Đã hủy
          </div>
        </div>
      </div>
      <div className={clsx('container', 'mt-5', [style['content-bg']])}>
        <div>
          <OrderDetail orders={orders} status={status} setOrderSelected={setOrderSelected} setPaymentOrder={setPaymentOrder} />
        </div>
        <DeleteOrder order_id={orderSelected} status={status} />
        {paymentOrder && <Payment order_id={paymentOrder} clientSecret={clientSecret} />}
      </div>
      <Footer />
    </div>
  );
}

export default MyOrders;
