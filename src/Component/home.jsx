import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import '../css/home.css'; 
import { TextField } from "@mui/material";

export function Password() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: { UserId: '', Password: '' },
    onSubmit: (value) => {
      axios.get('https://video-library-project.vercel.app/get-users')
        .then(res => {
          if (Array.isArray(res.data)) {
            var data = res.data.find(item => item.Password === value.Password);
            if (data) {
              navigate('/user-dashbord');
            } else {
              alert('Invalid User');
            }
          } else {
            console.error("Expected an array but got:", res.data);
            alert('Unexpected response format');
          }
        })
        .catch(err => {
          console.error("Error fetching data", err);
          alert('Error fetching data');
        });
    }
  });

  return (
    <form className="input-group" onSubmit={formik.handleSubmit}>
      <TextField id="outlined-controlled" className="w-50" label="Password*" onChange={formik.handleChange} name="Password" type="password" variant="outlined" />
      <button type="submit">Login</button>
    </form>
  );
}

export function Resister() {
  return (
    <div>
      <Link to={'/register'} className="btn btn-warning">Register</Link>
    </div>
  );
}

export function Home() {
  const [view, setview] = useState();
  const [EmailVisible, setIsEmailVisible] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user-id']);
  const formik = useFormik({
    initialValues: { UserId: '', UserName: '', Password: '', Email: '', Mobile: '' },
    onSubmit: (value) => {
      axios.get('http://127.0.0.1:3030/get-users')
        .then(res => {
          if (Array.isArray(res.data)) {
            var data = res.data.find(client => client.Email === value.Email);
            if (data) {
              setIsEmailVisible(false);
              setCookie('user-id', value.Email);
              setview(<Password />);
            } else {
              setview(<Resister />);
            }
          } else {
            console.error("Expected an array but got:", res.data);
            alert('Unexpected response format');
          }
        })
        .catch(err => {
          console.error("Error fetching data", err);
          alert('Error fetching data');
        });
    }
  });

  return (
    <div className="home-container">
      <main className="home-main">
        <h2 className="text-dark">Watch Technology Videos</h2>
        <p className="text-dark"> Any Where Any Time</p>
        <div className="input-group">
          <form onSubmit={formik.handleSubmit} className="input-group">
            {EmailVisible && (
              <TextField id="outlined-controlled" className="w-50" fullWidth label="Email Address*" name="Email" type='email' onChange={formik.handleChange} variant="outlined" />
            )}
            {EmailVisible && (
              <button className="" type="submit">
                GetStarted<span className="bi bi-chevron-right"></span>
              </button>
            )}
          </form>
        </div>
        <div className="my-3">
          {view}
        </div>
      </main>
    </div>
  );
}
