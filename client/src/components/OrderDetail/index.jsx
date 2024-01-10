import { BsTrash } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { MdOutlinePayments } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';

function OrderContainer({ orders, status, setOrderSelected, setPaymentOrder }) {
  // const [totalPrice, setTotalPrice] = useState(orders[0].totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  const authState = useSelector(authSelector);

  return (
    <div className="py-3">
      {' '}
      {orders.map((order, index) => (
        <div style={{ marginBottom: '100px' }} key={index}>
          <h5 className="d-flex ml-3">Đơn hàng: #{order.id}</h5>
          <table className="table">
            <tbody>
              {order.order_items.map((item) => (
                <tr className="my-1 d-flex" key={item.id}>
                  <td className="border-0">
                    <img className="image-size-mini d-flex" src={item.product.avatar} alt="" />
                  </td>
                  <td className="border-0" colSpan={2} style={{ width: '500px' }}>
                    <div className="d-flex flex-column mx-3">
                      <Link className="mt-2" to={`/product/${item.product.id}`}>
                        {item.product.name}
                      </Link>
                      <div className="d-flex my-2">
                        <CgNotes className="mt-1 mr-3" />
                        Ghi chú: {}
                      </div>
                      <div className="align-items-end d-flex mt-3">x{item.quantity}</div>
                    </div>
                  </td>
                  <td className="border-0">
                    <div>{item.caculate_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</div>
                  </td>
                </tr>
              ))}
              {status === 'pending' && (
                <td className="ml-4 border-0">
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={(e) => setOrderSelected(order.id)}
                      data-toggle="modal"
                      data-target="#DestroyOrder"
                    >
                      <BsTrash />
                    </button>
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={(e) => setPaymentOrder(order.id)}
                      data-toggle="modal"
                      data-target="#PaymentOrder"
                    >
                      <MdOutlinePayments /> Thanh Toán
                    </button>
                  </div>
                </td>
              )}
              {authState.user.is_superuser === 1 && (
                <td className="ml-4">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={(e) => setOrderSelected(order.id)}
                    data-toggle="modal"
                    data-target="#confirmOrder"
                  >
                    Xác nhận đơn hàng
                  </button>
                </td>
              )}
              {status === 'delevery' && (
                <td className="ml-4">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={(e) => setOrderSelected(order.id)}
                    data-toggle="modal"
                    data-target="#DestroyOrder"
                  >
                    Đã nhận được hàng
                  </button>
                </td>
              )}
            </tbody>
          </table>
          <hr />
          <div className="d-flex justify-content-between">
            <h4 className="text-info">Tổng Số Tiền</h4>
            <div>{order.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderContainer;
