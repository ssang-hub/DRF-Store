import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Sidebar from '../../components/managerSidebar';
import Container from './container';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/selectors';

function CreateProduct({ option }) {
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState(process.env.REACT_APP_DEFAULT_IMAGE_PRODUCT);
  const [product, setProduct] = useState({ name: '', price: 0 });
  const [isLoading, setIsloading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const { id } = useParams();
  const navigate = useNavigate();

  const authState = useSelector(authSelector);

  useEffect(() => {
    if (!authState.user.is_superuser) {
      navigate('/');
    }

    if (option) {
      const getProduct = async () => {
        try {
          const { data } = await axiosPrivate.get(`/product/${id}`);
          setProduct(data);
          setImage(data.avatar);
        } catch (error) {
          toast.error('Không tìm thấy sản phẩm', { position: 'bottom-right', theme: 'dark' });
        }
      };
      getProduct();
    }
  }, []);

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(image);
    };
  }, [file]);

  const hadleChangeAvatar = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setFile(file);
  };

  const changeProductData = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deleteImage = async () => {
    try {
      await axiosPrivate.put(`/product/product_admin//${id}/delete_avatar`);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const { data } = await axiosPrivate.request({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: option ? 'PUT' : 'POST',
        url: option ? '/editProduct' : '/product/product_admin/',
        data: {
          ...product,
          file: file,
        },
      });
      setIsloading(false);
      toast.success('Thêm sản phẩm thành công', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Sản phẩm đã tồn tại', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-xl-2 mt-4">
          <Sidebar option={'createProduct'} />
        </div>
        <div className="col-xl-8 d-flex" style={{ marginTop: '100px', marginBottom: '100px' }}>
          {/* container form */}
          <Container handleSubmit={handleSubmit} changeProductData={changeProductData} product={product} isLoading={isLoading} />
          <div style={{ marginLeft: '50px' }}>
            <button className="form-outline mb-4 btn btn-outline-primary">
              <input
                type="file"
                className="form-control form-control-lg"
                id="upload-image-user"
                name="image"
                onChange={(e) => hadleChangeAvatar(e)}
                hidden
              />
              <label htmlFor="upload-image-user" id="upload-image-label" className="btn-image-user m-0">
                Chọn File
              </label>
            </button>
            <button
              className="btn btn-outline-danger mb-4 ml-3"
              onClick={(e) => {
                deleteImage();
              }}
            >
              Xóa ảnh
            </button>
            <div>
              <img src={image} style={{ width: '300px', height: '400px' }} />
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateProduct;
