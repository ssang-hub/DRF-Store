import Footer from '../../components/footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import './style.scss';
import Header from '../../components/header';
import Sidebar from '../../components/managerSidebar';

import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from '../../api/axios';

function ProductManager() {
  const [products, setProducts] = useState(undefined);
  const authState = useSelector(authSelector);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!authState.user.is_superuser) {
      console.log(authState.user.is_superuser);
      navigate('/');
    }
    const getProducts = async () => {
      try {
        const { data } = await axios.get('/product/');
        setProducts(data.results);
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
              <Container products={products} />
              <div className="d-flex ">
                <nav aria-label="..." className="m-auto">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabindex="-1">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item ">
                      <a className="page-link" href="#">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductManager;
