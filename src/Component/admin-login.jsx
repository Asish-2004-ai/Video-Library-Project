import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import '../css/admin.css'; 

export function Admin() {
    const [cookies, setCookie, removeCookie] = useCookies(['admin-id']);
    var navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (value) => {
            axios.get('http://127.0.0.1:3030/get-admin')
                .then(res => {
                    if (value.UserId === res.data[0].UserId && value.Password === res.data[0].Password) {
                        setCookie('admin-id', value.UserId);
                        navigate('/admin-dashbord');
                        window.location.reload();
                    } else {
                        alert("Invalid credentials");
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("An error occurred. Please try again.");
                });
        }
    });

    return (
        <div className="d-flex justify-content-center align-items-center login-container">
            <form className="w-25 login-form" onSubmit={formik.handleSubmit}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-circle login-icon"></i>
                    <h2 className="login-title">Admin Login</h2>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="UserId">Admin Id</label>
                    <input 
                        type="text" 
                        name="UserId" 
                        onChange={formik.handleChange} 
                        className="form-control" 
                        id="UserId"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="Password">Password</label>
                    <input 
                        type="password" 
                        name="Password" 
                        onChange={formik.handleChange} 
                        className="form-control" 
                        id="Password"
                    />
                </div>
                <button type="submit" className="btn btn-danger w-100">Login</button>
            </form>
        </div>
    );
}
