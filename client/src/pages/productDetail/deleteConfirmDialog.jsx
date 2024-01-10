import React from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
function DeleteConfirmDialog({ review }) {
  const axiosPrivate = useAxiosPrivate();
  const deleteReviewMethod = async (e) => {
    try {
      await axiosPrivate({
        method: 'DELETE',
        url: `/product/product_review//${review.id}`,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal fade" id="deleteReview" tabIndex={-1} role="dialog" aria-labelledby="deleteReviewTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ marginTop: '150px' }}>
          <div className="modal-header">
            <h5 className="modal-title" id="deleteReviewLongTitle">
              Xóa nhận xét
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Bạn có muốn xóa nhận xét này?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Đóng
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={(e) => deleteReviewMethod(e)}>
              Xóa nhận xét
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmDialog;
