import { useEffect } from 'react';
import Category from '../../components/category';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Slider from '../../components/slider';
import axios from '../../api/axios';
import Product from '../../components/product';
// import { host } from "../../store/variable";
import { useState } from 'react';
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`/product/`);
        setProducts(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);
  return (
    <>
      <div>
        {' '}
        <Header />
        <Category />
        <Slider />
        <div className="container d-flex flex-wrap ">
          {products.map((product) => (
            <div key={product.id} className="m-auto">
              <Product product={product} />;
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
