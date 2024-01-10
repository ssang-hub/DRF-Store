import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';

function Conttainer({ products }) {
  //
  const [deleteProductID, setDeleteProductID] = useState(undefined);
  const authState = useSelector(authSelector);

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const handleDelete = () => {
    const deleteAction = async () => {
      try {
        await axiosPrivate.request({
          method: 'DELETE',
          url: '/deleteProduct',
          data: {
            id: deleteProductID,
          },
        });
        // await axios({
        //   method: "delete",
        //   url: "/deleteProduct",
        //   headers: {
        //     Authorization: `Bearer ${JSON.parse(localStorage.getItem()).accessToken}`,
        //   },
        //   data: {
        //     id: deleteProductID,
        //   },
        // });
        navigate('/');
      } catch (error) {
        console.log('error');
      }
    };
    deleteAction();
    navigate('/productmanager');
  };

  return (
    <>
      {products && (
        <div>
          <div className="d-flex">
            <div className="container">
              <div className="row">
                <h1>List Products</h1>
              </div>
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Mã Sách</th>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Ngày xuất bản</th>
                    <th>Số trang</th>
                    {authState.isAuthenticated && <th>Hành động</th>}
                  </tr>
                </thead>
                <tbody className="table-dark">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <th>{product.id}</th>
                      <th>{product.title}</th>
                      <th>{product.author}</th>
                      <th>{product.category}</th>
                      <th>{product.date}</th>
                      <th>{product.numberPage}</th>
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
                    Xóa Sách
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
                  <button type="button" className="btn btn-outline-danger" data-dismiss="modal" onClick={handleDelete}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Conttainer;
