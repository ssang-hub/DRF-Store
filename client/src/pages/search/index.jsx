import axios from '../../api/axios';
import { useEffect, useState } from 'react';

import Category from '../../components/category';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Slider from '../../components/slider';
import Product from '../../components/product';
import Pagination from '../../components/pagination';
import { useParams } from 'react-router-dom';

const SearchPage = () => {
  const [products, setProducts] = useState({ results: [] });
  const { key } = useParams();
  useEffect(() => {
    const searchProducts = async () => {
      const { data } = await axios.get('/product/search_products', { params: { key } });
      setProducts(data);
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
          {products.results.map((product) => (
            <div key={product.id} className="m-auto">
              <Product product={product} />;
            </div>
          ))}
        </div>
        <Pagination items={products} />
        <Footer />
      </div>
    </>
  );
};
export default SearchPage;
