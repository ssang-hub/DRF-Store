import { useEffect } from 'react';
import Category from '../../components/category';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Slider from '../../components/slider';
import axios from '../../api/axios';
import Product from '../../components/product';
import { useState } from 'react';
import Pagination from '../../components/pagination';
const Home = () => {
  const [products, setProducts] = useState({ results: [] });
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`/product/`);
        setProducts(data);
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
          {products.results.map((product) => (
            <div key={product.id} className="m-auto">
              <Product product={product} />;
            </div>
          ))}
        </div>
        <div className="container">
          <Pagination setItems={setProducts} items={products} />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
