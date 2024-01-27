import clsx from 'clsx';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function DeleteOrder({ order_id, status }) {
  const axiosPrivate = useAxiosPrivate();
  const ConfirmAction = async () => {
    // console.log(deleteOrder);
    try {
      await axiosPrivate.request({
        method: status === 'pending' ? 'DELETE' : 'PUT',
        url: status === 'pending' ? `/order/${order_id}` : `/order/${order_id}/confirm_complete`,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade" id="DestroyOrder" tabIndex={-1} role="dialog" aria-labelledby="DestroyOrderTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="DestroyOrderLongTitle">
              {status === 'pending' ? 'Hủy Đơn Hàng' : 'Đã nhận được hàng'}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {status === 'pending' ? (
            <div className="modal-body">Bạn có muốn hủy đơn hàng này không?</div>
          ) : (
            <div className="modal-body">Bạn đã nhận được hàng?</div>
          )}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Đóng
            </button>

            {status === 'pending' ? (
              <button type="button" className={clsx('btn', 'btn-outline-danger')} onClick={(e) => ConfirmAction(e)}>
                Hủy Đơn Hàng
              </button>
            ) : (
              <button type="button" className={clsx('btn', 'btn-outline-danger')} onClick={(e) => ConfirmAction(e)}>
                Đã nhận được hàng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteOrder;
