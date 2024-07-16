import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "../css/user.css"; 
import { Button, Checkbox, TextField,Box,AccountCircle } from "@mui/material";
import { useEffect, useState } from "react";

export function Userlogin() {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const [userId, setUserId] = useState('');

  const formik = useFormik({
    initialValues: { UserId: '', Password: '' },
    onSubmit: (value) => {
      axios.get('https://video-library-server.vercel.app/get-users')
        .then(res => {
          var data = res.data.find(item => item.UserId === value.UserId);
          if (data) {
            if (data.Password === value.Password) {
              setCookie('user-id', value.UserId);
              navigate('/user-dashbord');
              window.location.reload();
            } else {
              alert('Invalid User');
            }
          } else {
            alert('Invalid User');
          }
        });
    }
  });

  useEffect(() => {
    setUserId(formik.values.UserId);
  }, [formik.values.UserId]);

  return (
    <div className="user-login-form-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form onSubmit={formik.handleSubmit} className="user-login-form">
        <h3 className="form-header text-dark bi bi-person-circle"> User Login</h3>
        <dl>
          <dd><TextField variant="outlined" label="UserID" fullWidth name="UserId" helperText='Id requierd' onChange={formik.handleChange} required type="text"></TextField></dd>
          <dd><TextField variant="outlined" className="mt-3 w-100" label="Password*" fullWidth name="Password" onChange={formik.handleChange} type="password"></TextField></dd>
          <dd><Checkbox></Checkbox><label className="text-dark">Remember me</label></dd>
       
      
        </dl>
        <div className="form-button-container">
          <Button variant="contained" fullWidth type="submit">Login</Button>
        </div>
        <div className="mt-3">
          <Link to={`/forgot/${userId}`} className="mt-3" style={{marginRight:'45%'}}>Forgot Password?</Link>
          <Link to='/register' className="mt-3">Sign up?</Link>

        </div>
        
      </form>
    </div>
  );
}
