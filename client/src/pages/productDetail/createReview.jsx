import React from 'react';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { AiFillStar } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

import DeleteConfirmDialog from './deleteConfirmDialog';

function CreateReview({ product, is_authenticated }) {
  const [numberStar, setNumberStar] = useState(undefined);
  const [reviewContent, setReviewContent] = useState(undefined);
  const [EmojiPickerShow, setEmojiPickerShow] = useState(false);
  const [createReview, setcreateReview] = useState(true);
  const [review, setReview] = useState(undefined);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (is_authenticated) {
      const getMyReview = async () => {
        try {
          const { data } = await axiosPrivate.get(`/product/product_review//get_my_review`, { params: { product_id: product.id } });
          setNumberStar(data.vote);
          setReviewContent(data.content);
          setcreateReview(false);
          setReview(data);
        } catch (error) {
          setReview(undefined);
        }
      };
      getMyReview();
    }
  }, []);

  useEffect(() => {
    const stars = document.querySelectorAll('.star-vote');
    // console.log(stars);
    for (var i = 0; i < numberStar; i++) {
      stars[i].classList.add('yellow-color');
    }
    for (var j = numberStar; j < stars.length; j++) {
      stars[j].classList.remove('yellow-color');
    }
  }, [numberStar]);

  const createReviewMethod = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosPrivate.request({
        method: createReview ? 'POST' : 'PUT',
        url: createReview ? '/product/product_review/' : `/product/product_review//${review.id}`,
        data: {
          product: product.id,
          vote: numberStar,
          content: reviewContent,
          id: createReview ? '' : review.id,
        },
      });
      if (result.data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmojiClick = (emojiObject, event) => {
    let msg = reviewContent || '';
    msg = msg + emojiObject.emoji;
    setReviewContent(msg);
  };
  return (
    <div className="modal fade" id="createReview" tabIndex={-1} role="dialog" aria-labelledby="createReviewTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createReviewLongTitle">
              Viết đánh giá
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex">
              <img src={product.avatar} className="imageSize d-flex" alt="" />
              <h6 className="ml-3 d-flex m-auto">{product.name}</h6>
            </div>
            <div className="d-flex mt-3">
              <div className="star-vote" onClick={(e) => setNumberStar(1)}>
                <AiFillStar className="star-size" />
              </div>
              <div className="star-vote" onClick={(e) => setNumberStar(2)}>
                <AiFillStar className="star-size" />
              </div>{' '}
              <div className="star-vote" onClick={(e) => setNumberStar(3)}>
                <AiFillStar className="star-size" />
              </div>
              <div className="star-vote" onClick={(e) => setNumberStar(4)}>
                <AiFillStar className="star-size" />
              </div>
              <div className="star-vote" onClick={(e) => setNumberStar(5)}>
                <AiFillStar className="star-size" />
              </div>
            </div>
            {numberStar && (
              <div className="mt-4">
                <h5 className="d-flex"> Góp ý </h5>

                <div className="form-outline mb-4 ">
                  <form onSubmit={createReviewMethod} id="createReviewForm">
                    <div className="d-flex">
                      <textarea
                        type="text"
                        className="form-control form-control-lg border-0 position-relative"
                        name="reviewContent"
                        placeholder="...."
                        onChange={(e) => setReviewContent(e.target.value)}
                        value={reviewContent}
                        rows="4"
                        cols="50"
                        required
                      ></textarea>
                      <div type="button" className="d-block position-absolute" style={{ bottom: '50px', right: '50px' }} onClick={(e) => setEmojiPickerShow(!EmojiPickerShow)}>
                        <BsEmojiSmile />
                      </div>
                      {EmojiPickerShow && (
                        <div style={{ zIndex: '3', marginLeft: '500px', top: '100px', position: 'absolute' }}>
                          <EmojiPicker height={500} width={500} onEmojiClick={handleEmojiClick} />
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Đóng
            </button>
            {review && (
              <div>
                <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#deleteReview">
                  Xóa Nhận xét này
                </button>
                <DeleteConfirmDialog review={review} />
              </div>
            )}
            <button type="submit" className="btn btn-primary" form="createReviewForm">
              Gửi nhận xét
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateReview;
