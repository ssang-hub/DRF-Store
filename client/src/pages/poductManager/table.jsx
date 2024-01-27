import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductTable({ products }) {
  const [deleteProductID, setDeleteProductID] = useState(undefined);
  const authState = useSelector(authSelector);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      await axiosPrivate.delete(`/product/product_admin//${deleteProductID}`);
      toast.success('Xóa sản phẩm thành công', { position: 'bottom-right' });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log('error');
    }
    setIsDeleteLoading(false);
  };

  return (
    <>
      {products && (
        <div>
          <div className="d-flex">
            <div className="container">
              <div className="row">
                <h1>Danh sách sản phẩm</h1>
              </div>
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Loại sản phẩm</th>
                    <th>Gía bán</th>
                    {authState.isAuthenticated && <th>Thao tác</th>}
                  </tr>
                </thead>
                <tbody className="table-dark">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <th>{product.id}</th>
                      <th>{product.name}</th>
                      <th>{product.category}</th>
                      <th>{product.price}</th>
                      {authState.isAuthenticated && (
                        <th>
                          <div className="d-flex">
                            <a href={`edit/product/${product.id}`} className="btn btn-outline-success mx-2">
                              Edit
                            </a>
                            <button
                              className="btn btn-outline-danger mx-2"
                              type="button"
                              data-toggle="modal"
                              data-target="#modal-delete"
                              onClick={(e) => {
                                setDeleteProductID(product.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </th>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal fade" id="modal-delete" role="dialog" aria-labelledby="modal-deleteCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Xóa Sản Phẩm
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Bạn có muốn xóa không?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Thoát
                  </button>
                  <button type="button" className="btn btn-outline-danger" disabled={isDeleteLoading} onClick={handleDelete}>
                    {isDeleteLoading ? (
                      <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
                      'Xóa'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default ProductTable;
