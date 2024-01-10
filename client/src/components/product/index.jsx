import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import clsx from 'clsx';
function Product({ product }) {
  return (
    <Link to={`/product/${product.id}`} className={clsx('card', 'm-3', [style['card']])} style={{ width: '200px' }}>
      <div style={{ height: '250px' }}>
        <img src={product.avatar} style={{ maxWidth: 175, maxHeight: 250 }} alt="" />
      </div>
      <div className="d-flex ml-3">
        <p>
          5<AiFillStar style={{ color: 'yellow' }} />
        </p>
        <p className="ml-3 text-dark">Đã bán: 5</p>
      </div>
      <p className={clsx([style['product-name']])}>{product.name}</p>
      {/* <h6 className="text-dark d-flex ml-3">Tác giả: {product.author}</h6> */}
      <h5 className="text-danger d-flex ml-3">{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</h5>
      <div className="d-flex ml-3 btn btn-outline-primary" style={{ fontSize: '10px', width: '75px' }}>
        FreeShip+
      </div>
    </Link>
  );
}

export default Product;
