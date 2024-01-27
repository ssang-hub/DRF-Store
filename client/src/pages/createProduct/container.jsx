import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

function Container({ handleSubmit, changeProductData, product, isLoading }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get('/product/get_all_categories');
      setCategories(data);
    };
    getCategories();
  }, []);
  return (
    <div>
      {' '}
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div>
            <div className="d-flex">
              <div className="form-outline mb-4 mr-3">
                <div className="float-left">Tên sản phẩm</div>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="name"
                  placeholder="Tên sản phẩm"
                  required
                  defaultValue={product.name}
                  onChange={(e) => changeProductData(e)}
                />
              </div>
            </div>
            <div className="form-outline mb-4">
              <div className="float-left"> Mô tả sản phẩm </div>
              <textarea
                type="date"
                className="form-control form-control-lg"
                name="detail"
                onChange={(e) => changeProductData(e)}
                placeholder="Mô tả sản phẩm"
                rows="4"
                defaultValue={product.detail}
                cols="50"
                required
              ></textarea>
            </div>
            <div className="d-flex">
              <div className="form-group w-50">
                <div className="float-left"> Thể loại </div>
                <select
                  className="form-control form-select"
                  id="exampleFormControlSelect1"
                  name="category"
                  defaultValue={product.category}
                  onChange={(e) => {
                    changeProductData(e);
                  }}
                >
                  <option value={''}>____________Chọn loại sản phẩm__________</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.category_name} selected={product.category === item.category_name}>
                      {item.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-outline mb-4">
                <div className="float-left ml-3"> Giá </div>
                <input
                  type="number"
                  className="form-control form-control-lg ml-3"
                  name="price"
                  onChange={(e) => changeProductData(e)}
                  min={1000}
                  // defaultValue={product.price}
                  value={product.price}
                  placeholder="Giá"
                  required
                />
              </div>{' '}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-outline-success" disabled={isLoading}>
          {isLoading ? (
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            'Lưu lại'
          )}
        </button>
      </form>
    </div>
  );
}

export default Container;
