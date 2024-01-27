const ProductInfo = ({ product }) => {
  return (
    <>
      <div className="container mt-5">
        <div className="w-50 ">
          <h5 style={{ fontWeight: 'normal' }} className="d-flex">
            Thông tin chi tiết
          </h5>
          <table className="table row secondary-color">
            <div className="col-xl-4">
              <div className="m-3 d-flex">Tác giả</div>
              <div className="m-3 d-flex">Thể loại</div>
              <div className="m-3 d-flex">Số trang</div>
              <div className="m-3 d-flex">Loại bìa</div>
              <div className="m-3 d-flex">Ngày xuất bản</div>
            </div>
            <div className="col-xl-6">
              <div className="m-3 d-flex">Bìa mềm</div>
            </div>
          </table>
        </div>
      </div>
      <div className="container mt-5 p-0">
        <div className="light-color w-50">
          <div className="p-5">
            <h4 className="d-flex">Mô Tả Sản Phẩm</h4>
            <div>{product.detail}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
