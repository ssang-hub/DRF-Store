import { GrFormNext, GrPrevious } from "react-icons/gr";
const Category = () => {
  return (
    <div className="container">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <ul className="d-flex justify-content-around py-3">
              <li style={{ listStyleType: "none" }}>Truyện tranh</li>
              <li style={{ listStyleType: "none" }}>Truyện Manga</li>
              <li style={{ listStyleType: "none" }}>Truyện kinh dị</li>
              <li style={{ listStyleType: "none" }}>Truyện cười</li>
              <li style={{ listStyleType: "none" }}>Truyện cổ tích</li>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="d-flex justify-content-around py-3">
              <li style={{ listStyleType: "none" }}>Sách triết lý</li>
              <li style={{ listStyleType: "none" }}>Sách nấu ăn</li>
              <li style={{ listStyleType: "none" }}>Sách kinh doanh</li>
              <li style={{ listStyleType: "none" }}>Sách khoa học</li>
              <li style={{ listStyleType: "none" }}>Sách tiếng anh</li>
              <li style={{ listStyleType: "none" }}>Khác</li>
            </ul>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          style={{ width: "30px" }}
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true">
            <GrPrevious />
          </span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          style={{ width: "30px" }}
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true">
            <GrFormNext style={{ fontSize: "28px" }} />
          </span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};
export default Category;
