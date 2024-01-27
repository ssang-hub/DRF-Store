import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/managerSidebar';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import OrderDetail from '../../components/OrderDetail';
import OrderModal from './OrderModal';
function ManageOrder() {
  const [option, setOption] = useState('pending');
  const [orders, setOrders] = useState([]);
  const [confirmOrder, setConfirmOrder] = useState(undefined);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getOrders = async () => {
      const data = await axiosPrivate.request({ method: 'GET', url: `/AllOrders` });
      const temp = Object.keys(data.data).map((key) => data.data[key]);
      setOrders(temp);
    };
    getOrders();
  }, [option]);
  return (
    <div>
      <Header />
      <div className="row">
        <div className="col-xl-2 mt-4">
          <Sidebar option={'manageOrder'} />
        </div>
        <div className="col-xl-8 d-flex" style={{ marginTop: '100px', marginBottom: '100px' }}>
          <div className="container mt-5 ">
            <div>
              <OrderDetail orders={orders} option={option} setOrderOption={setConfirmOrder} />
            </div>
            <OrderModal confirmOrder={confirmOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageOrder;
