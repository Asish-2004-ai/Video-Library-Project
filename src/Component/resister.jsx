import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import '../css/register.css'; 
import { Link } from "react-router-dom";

export function Register() {
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    UserId: Yup.string()
      .required('UserId is required'),
    UserName: Yup.string()
      .required('UserName is required'),
    Password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    Email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    Mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile is required'),
  });

  const formik = useFormik({
    initialValues: { UserId: '', UserName: '', Password: '', Email: '', Mobile: '' },
    validationSchema: validationSchema,
    onSubmit: (value => {
      axios.post('https://mern-api-snowy.vercel.app/register-user', value)
        .then(() => {
          navigate('/user-login');
        });
    })
  });

  return (
    <div className="register-form-container">
      
      <form className="register-form" onSubmit={formik.handleSubmit}>
        <h3>Register</h3>
        <dl>
          <dt>UserId</dt>
          <dd>
            <input type="text" onChange={formik.handleChange} name="UserId" />
            {formik.errors.UserId && formik.touched.UserId ? (
              <div className="error">{formik.errors.UserId}</div>
            ) : null}
          </dd>
          <dt>UserName</dt>
          <dd>
            <input type="text" onChange={formik.handleChange} name="UserName" />
            {formik.errors.UserName && formik.touched.UserName ? (
              <div className="error">{formik.errors.UserName}</div>
            ) : null}
          </dd>
          <dt>Password</dt>
          <dd>
            <input type="password" onChange={formik.handleChange} name="Password" />
            {formik.errors.Password && formik.touched.Password ? (
              <div className="error">{formik.errors.Password}</div>
            ) : null}
          </dd>
          <dt>Email</dt>
          <dd>
            <input type="email" onChange={formik.handleChange} name="Email" />
            {formik.errors.Email && formik.touched.Email ? (
              <div className="error">{formik.errors.Email}</div>
            ) : null}
          </dd>
          <dt>Mobile</dt>
          <dd>
            <input type="text" onChange={formik.handleChange} name="Mobile" />
            {formik.errors.Mobile && formik.touched.Mobile ? (
              <div className="error">{formik.errors.Mobile}</div>
            ) : null}
          </dd>
        </dl>
       <div className="d-flex" style={{flexDirection:'row'}}>
       <Link to='/user-login' className="w-50 me-4"><button className="btn btn-danger ">Cancel</button></Link>
       <button className="btn btn-warning w-50" type="submit">Submit</button>
       </div>
      </form>
    </div>
  );
}
