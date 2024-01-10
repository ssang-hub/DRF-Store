import axios from '../../api/axios';
import { useEffect, useState } from 'react';

import Category from '../../components/category';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Slider from '../../components/slider';
import Product from '../../components/product';
import { useParams } from 'react-router-dom';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const { key } = useParams();
  useEffect(() => {
    const searchProducts = async () => {
      console.log('key' + key);
      const { data } = await axios.get('/product/search_products', { params: { key } });
      setProducts(data.results);
    };
    searchProducts();
  }, [key]);
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
export default SearchPage;
