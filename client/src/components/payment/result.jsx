import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentResult = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const check_payment_intent = async () => {
      try {
        await axiosPrivate.post('/payment/check_payment_intent', { order_id: Number(order_id) });
        toast.success('Thanh toán thành công', { position: 'top-center', theme: 'dark' });
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } catch (error) {
        error.response.status === 404 && toast.error('Đơn hàng chưa được thanh toán', { position: 'top-center', theme: 'dark' });
        error.response.status === 400 && toast.error('Đơn hàng không tồn tại ', { position: 'top-center', theme: 'dark' });
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    };
    check_payment_intent();
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};
export default PaymentResult;
