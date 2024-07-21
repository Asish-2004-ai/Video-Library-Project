import { TextField } from "@mui/material";
import '../css/forgot.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function Forgot() {
    let navigate = useNavigate();
    const { id } = useParams();

    const validationSchema = Yup.object({
        Email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        Password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            Email: '',
            Password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.get('https://mern-api-snowy.vercel.app/get-users')
                .then(res => {
                    const user = res.data.find(item => item.Email === values.Email);
                    if (user && user.UserId === id) {
                        axios.put(`https://mern-api-snowy.vercel.app/forgot/${id}`, { Password: values.Password })
                            .then(() => {
                                alert('Password changed successfully');
                                navigate('/user-login');
                            })
                            .catch(err => {
                                console.error('Error updating password:', err);
                                alert('Failed to update password');
                            });
                    } else {
                        alert('Invalid Email or User ID');
                    }
                })
                .catch(err => {
                    console.error('Error fetching users:', err);
                    alert('Failed to fetch users');
                });
        }
    });

    return (
        <div className="forgot-container">
            <main>
                <div>
                    <h1 className='text-dark bi bi-lock-fill' style={{ position: 'relative', top: '85px' }}></h1>
                </div>
                <div className='header'>
                    <h3 className='text-dark'>Forgot Password?</h3>
                    <p className="text-dark">You can reset your password here.</p>
                </div>

                <div className='form-input'>
                    <form className="forgot-form" onSubmit={formik.handleSubmit}>
                        <div className='mt-5'>
                            <dl>
                                <dd>
                                    <TextField 
                                        variant="standard" 
                                        className="w-100" 
                                        name="Email" 
                                        label='Current Email*' 
                                        onChange={formik.handleChange} 
                                        value={formik.values.Email} 
                                        error={formik.touched.Email && Boolean(formik.errors.Email)}
                                        helperText={formik.touched.Email && formik.errors.Email}
                                    />
                                </dd>
                                <dd>
                                    <TextField 
                                        variant="standard" 
                                        className="w-100" 
                                        name="Password" 
                                        label='New Password*' 
                                        onChange={formik.handleChange} 
                                        value={formik.values.Password} 
                                        error={formik.touched.Password && Boolean(formik.errors.Password)}
                                        helperText={formik.touched.Password && formik.errors.Password}
                                    />
                                </dd>
                            </dl>
                            <button className="btn btn-primary" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
