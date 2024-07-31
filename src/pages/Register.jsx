import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
        }),
        onSubmit: async (values) => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/v1/register', values, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response?.data?.error || 'Something went wrong');
            }
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div>{formik.errors.username}</div>
                    ) : null}
                </div>
                <div>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type='submit'>Register</button>
            </form>
            <ToastContainer />
        </>
    );
};

export default Register;
