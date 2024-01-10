const Slider = () => {
  return (
    <div className="d-flex container slider">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active  w-100">
            <img className="d-block w-100" style={{ height: "292px" }} src="https://salt.tikicdn.com/ts/banner/26/f1/3f/340bc788c0396212fd746d890cf657b2.png" alt="First slide" />
          </div>
          <div className="carousel-item  w-100">
            <img className="d-block w-100" style={{ height: "292px" }} src="https://salt.tikicdn.com/ts/banner/13/b1/03/5ef2d668f899a9117e4f27c90a79a973.png" alt="Second slide" />
          </div>
          <div className="carousel-item  w-100">
            <img className="d-block w-100" style={{ height: "292px" }} src="https://salt.tikicdn.com/ts/banner/26/f1/3f/340bc788c0396212fd746d890cf657b2.png" alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div>
        <img src="https://salt.tikicdn.com/ts/tikimsp/34/47/59/32d2277c77232d0d16c3c4bac17eab0b.jpg" alt="" style={{ width: "400px", height: "300px" }} />
      </div>
    </div>
  );
};
export default Slider;
