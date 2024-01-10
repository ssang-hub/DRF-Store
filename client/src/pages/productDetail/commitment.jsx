import { AiOutlineLike } from 'react-icons/ai';
import { BsShieldCheck } from 'react-icons/bs';
import { GiReturnArrow } from 'react-icons/gi';
const Commitment = () => {
  return (
    <div className="col-xl-3">
      <table className="table">
        <tbody>
          <tr>
            <th scope="col" className="col-3 ">
              <BsShieldCheck />
              <div className="benefit-item text-12">
                <span>
                  Hoàn tiền
                  <br />
                  <b>111%</b>
                  <br />
                  nếu hàng giả
                </span>
              </div>
            </th>
            <th scope="col" className="col-3 ">
              <AiOutlineLike />
              <div className="benefit-item text-12">
                <span>
                  Mở hộp
                  <br />
                  kiểm tra
                  <br />
                  nhận hàng
                </span>
              </div>
            </th>
            <th scope="col" className="col-3 ">
              <GiReturnArrow />
              <div className="benefit-item text-12">
                <span>
                  Đổi trả trong <br />
                  <b>30 ngày</b> <br /> nếu sp lỗi
                </span>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Commitment;
