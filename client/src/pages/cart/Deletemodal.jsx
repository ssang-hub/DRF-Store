import React from 'react';
function DeleteModal({ deleteCartItemMethod }) {
  return (
    <div className="modal fade" id="CartItemDelete" tabIndex={-1} role="dialog" aria-labelledby="CartItemDeleteTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCartItem">
              Xóa khỏi giỏ hàng
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
              Đóng
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={deleteCartItemMethod} data-dismiss="modal">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
