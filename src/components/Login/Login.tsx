import { Outlet, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Logic đăng nhập
    const loginSuccessful = true; // Kết quả giả định của đăng nhập

    console.log('onlick ')
    if (loginSuccessful) {
      navigate('/#');
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100%'}}>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      <Outlet />
    </div>
  );
};

export default Login;
