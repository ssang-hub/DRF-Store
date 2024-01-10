import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ProductManager from './pages/poductManager';
import CreateProduct from './pages/createProduct';
import ProductDetail from './pages/productDetail';
import MyCart from './pages/cart';
import MyOrder from './pages/orders';
import ManageOrder from './pages/manadeOrder';
import SearchPage from './pages/search';
import Payment from './components/payment/result';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search_product/search_key=:key" element={<SearchPage />} />
        <Route path="/productManager" element={<ProductManager />} />
        <Route path="/edit/product/:id" element={<CreateProduct option={'update'} />} />
        <Route path="/product/:product_id" element={<ProductDetail />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/myCart" element={<MyCart />} />
        <Route path="/myOrder" element={<MyOrder />} />
        <Route path="/payment/:order_id" element={<Payment />} />
        <Route path="/manageOrders" element={<ManageOrder />} />
      </Routes>
    </div>
  );
}

export default App;
