import { useState } from 'react';
import { axiosPrivate } from '../../api/axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateCategoryModal() {
  const [name, setName] = useState();
  const addCategory = async () => {
    try {
      await axiosPrivate.post('/product/product_admin//create_category', { category_name: name });
      toast.success('Thêm loại sản phẩm thành công');
    } catch (error) {
      toast.error('Thêm loại sản phẩm thất bại');
    }
  };
  return (
    <div className="modal fade" id="createCategory" tabIndex={-1} role="dialog" aria-labelledby="createCategoryTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCartItem">
              Thêm Loại sản phẩm
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input type="text" className="form-control form-control-lg" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
              Đóng
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={(e) => addCategory()}>
              Thêm
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateCategoryModal;
