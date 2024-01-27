import Footer from '../../components/footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from './table';
import './style.scss';
import Header from '../../components/header';
import Sidebar from '../../components/managerSidebar';

import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';
import axios from '../../api/axios';
import Pagination from '../../components/pagination';

function ProductManager() {
  const [products, setProducts] = useState(undefined);
  const authState = useSelector(authSelector);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.user.is_superuser) {
      navigate('/');
    }
    const getProducts = async () => {
      try {
        const { data } = await axios.get('/product/');
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      {products && (
        <>
          <header>
            <Header />
          </header>
          <div style={{ marginTop: '60px' }}>
            <div className="container pt-4"></div>
          </div>
          <div className="row">
            <div className="col-xl-2">{authState.isAuthenticated && <Sidebar option={'manager'} />}</div>
            <div className="col-xl-8">
              <ProductTable products={products.results} />
              <Pagination items={products} />
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductManager;
