import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineLike } from 'react-icons/ai';

import axios from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import CreateReview from './createReview';
import style from './style.module.scss';

function ReviewProduct({ is_authenticated, product }) {
  const [reviews, setReviews] = useState([]);
  const arr = [1, 2, 3, 4, 5];
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAllReview = async () => {
      const { data } = await axios.get(`/product/product_review/`, { params: { product_id: product.id } });
      setReviews(data.results);
    };

    getAllReview();
  }, []);

  const likeReview = async (reviewId) => {
    try {
      await axiosPrivate.put(`/product/product_review//${reviewId}/like_review`);
      setReviews((prevState) => {
        return prevState.map((review) => {
          if (review.id === reviewId) {
            return {
              ...review,
              like_count: review.like_count + 1,
            };
          }
          return review;
        });
      });
    } catch (error) {}
  };

  return (
    <div className={clsx([style['border-content']], 'w-60', 'mt-5')}>
      <div className="review-header mt-4 ml-3">
        <h4 className="d-flex">Đánh giá sản phẩm </h4>
      </div>
      <hr />
      <div className="review-body">
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="m-4">
              <h5 className="d-flex">{review.uname}</h5>
              <div className="d-flex my-2">
                {arr.map((v, i) => (
                  <div key={v}>{v > review.vote ? <AiFillStar /> : <AiFillStar className="yellow-color" />}</div>
                ))}
              </div>
              <div className="d-flex my-2">{review.content}</div>
              <div className="d-flex text-info hover-pointer" onClick={() => likeReview(review.id)}>
                <AiOutlineLike className="font-size-24 m-0" /> {review.like_count} Lượt thích
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="review-footer">
        {is_authenticated ? (
          <div>
            <div className="d-flex justify-content-around">
              <button className="btn btn-primary px-5 py-2 my-4" data-toggle="modal" data-target="#createReview">
                Viết đánh giá
              </button>
              <button className="btn btn-primary px-5 py-2 my-4">Xem thêm đánh giá</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-around">
              <button type="button" className="btn btn-primary px-5 py-2 my-4" disabled>
                Đăng nhập để viết đánh giá
              </button>
              <button type="button" className="btn btn-primary px-5 py-2 my-4">
                Xem thêm đánh giá
              </button>
            </div>
          </div>
        )}
      </div>
      <CreateReview product={product} is_authenticated={is_authenticated} />
    </div>
  );
}

export default ReviewProduct;
