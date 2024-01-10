import React from 'react';

function Container({ handleSubmit, changeProductData, product }) {
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
                  <option value={'Truyện thiếu nhi'} selected={product.category === 'Truyện thiếu nhi'}>
                    Truyện thiếu nhi
                  </option>
                  <option value={'Truyện phiêu lưu'} selected={product.category === 'Truyện phiêu lưu'}>
                    Truyện phiêu lưu
                  </option>
                  <option value={'Truyện bí ẩn'} selected={product.category === 'Truyện bí ẩn'}>
                    Truyện bí ẩn
                  </option>
                  <option value={'Truyện tâm lý'} selected={product.category === 'Truyện tâm lý'}>
                    Truyện tâm lý
                  </option>
                  <option value={'Truyện tình cảm'} selected={product.category === 'Truyện tình cảm'}>
                    Truyện tình cảm
                  </option>
                  <option value={'Truyện cười'} selected={product.category === 'Truyện cười'}>
                    Truyện cười
                  </option>
                  <option value={'Khác'} selected={product.category === 'Khác'}>
                    Khác
                  </option>
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
        <button type="submit" className="btn btn-outline-success">
          Lưu lại
        </button>
      </form>
    </div>
  );
}

export default Container;
