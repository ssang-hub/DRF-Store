import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function CreateOrder({ cartItemSelect }) {
  const navigation = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const CreateOrder = async (e) => {
    try {
      await axiosPrivate.post('/order/', { cart_items: cartItemSelect });
      navigation('/myOrder');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="CreateOrderModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="CreateOrderModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="CreateOrderModal">
              Đặt hàng
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Bạn Có muốn đặt hàng không?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
              Đóng
            </button>
            <button type="button" className="btn btn-outline-primary" data-dismiss="modal" onClick={(e) => CreateOrder(e)}>
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
