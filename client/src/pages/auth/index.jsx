import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

// google login api
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { login } from '../../store/reducers/auth.slice';

const Auth = () => {
  const [fullname, setFullName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwdConfirm, setPasswdConfirm] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [authOption, setAuthOption] = useState(false);

  const dispatch = useDispatch();

  // initial gapi
  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ clientId: process.env.REACT_APP_GOOGLE });
    });
  }, []);

  const RegisterMethod = async (e) => {
    e.preventDefault();
    if (passwdConfirm !== password) {
      toast.error('Mật khẩu nhập lại không khớp', {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
    } else {
      try {
        const result = await axios.post('/auth/register/', { fullname, password, email });
        result.status === 201 &&
          toast.success('Đăng Ký thành công', {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: 'dark',
          });
      } catch (error) {
        toast.error('Người dùng đã tồn tại', {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        });
      }
    }
  };

  const LoginMethod = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login/', { email, password });
      dispatch(login(res.data));
      localStorage.setItem(process.env.REACT_APP_APP_NAME, JSON.stringify({ token: res.data.token, refresh_token: res.data.refresh_token }));
      window.location.reload();
    } catch (error) {
      toast.error('Thông tin tài khoản mật khẩu không chính xác', { theme: 'dark', position: 'bottom-right' });
    }
  };

  const googleAuth = async (profileObj) => {
    const data = await axios.post('/googleVerify', { tokenId: profileObj.tokenId });
    if (data.data) {
      localStorage.setItem(process.env.REACT_APP_APP_NAME, JSON.stringify(data.data));
      window.location.reload();
    }
  };

  return (
    <div className="modal fade" id="LoginModal" tabIndex={'-1'} role="dialog" aria-labelledby="LoginModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '800px' }} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex">
            <div className="mx-3 w-50">
              <div>
                <h2>Xin Chào</h2>
                <p>Đăng nhập hoặc tạo tài khoản</p>
              </div>
              <form onSubmit={authOption ? RegisterMethod : LoginMethod} id="auth-form">
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    form="auth-form"
                    required
                  />
                </div>
                <div className="form-outline mb-4">
                  <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={(e) => setPassword(e.target.value)} name="password" required />
                </div>
              </form>
              {!authOption ? (
                <>
                  {/* login form */}
                  <button type="submit" form="auth-form" className="btn btn-danger my-2">
                    Đăng Nhập
                  </button>
                  <div className="my-2">
                    Bạn chưa có tài khoản?
                    <button className="btn btn-primary ml-2 my-2" onClick={() => setAuthOption((prevState) => !prevState)}>
                      Đăng Ký
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* register form */}
                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" placeholder="UserName" onChange={(e) => setFullName(e.target.value)} name="fullname" required />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="PasswordConfirm"
                      onChange={(e) => setPasswdConfirm(e.target.value)}
                      name="passwordConfirm"
                      form="auth-form"
                      required
                    />
                  </div>

                  <button type="submit" form="auth-form" className="btn btn-danger my-2">
                    Đăng Ký
                  </button>
                  <div className="my-2">
                    Bạn đã có tài khoản?
                    <button className="btn btn-primary ml-2 my-2" onClick={() => setAuthOption((prevState) => !prevState)}>
                      Đăng Nhập
                    </button>
                  </div>
                </>
              )}

              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE}
                onSuccess={googleAuth}
                onFailure={(res) => console.log(res)}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <div className="btn btn-outline-danger mx-2" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <AiOutlineGoogle />
                  </div>
                )}
              />
            </div>
            <div style={{ backgroundColor: 'rgb(219, 238, 255) 85%)' }}>
              <img className="ml-3" src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" style={{ width: '60%', marginTop: '15%' }} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Auth;
