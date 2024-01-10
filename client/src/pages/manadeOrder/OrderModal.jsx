import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function OrderModal({ confirmOrder }) {
  const ConfirmAction = async () => {
    // console.log(deleteOrder);
    const axiosPrivate = useAxiosPrivate()

    try {
      const result = await axiosPrivate.request({
        method: "PUT",
        url: "/confirmOrderAdmin",
        data: { id: confirmOrder },
      });
      if (result.data) {
        window.location.reload();
      }
      // navigate('/r')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal fade" id="confirmOrder" tabIndex={-1} role="dialog" aria-labelledby="confirmOrderTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmOrderLongTitle">
              Xác nhận đơn hàng
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Bạn có xác nhận đơn hàng không?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Đóng
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={(e) => ConfirmAction(e)}>
              Xác nhận đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
