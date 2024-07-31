import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const formik = useFormik({
        initialValues :{
            email : '',
            password : ''
        },
        validationSchema : Yup.object({
            email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
            password : Yup.string()
            .required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/v1/login', values);
                localStorage.setItem('token', response.data.token);
                toast.success('Login successful');
            } catch (error) {
                // Check if the error response exists and has data
                const errorMessage = error.response?.data?.error || 'Something went wrong';
                toast.error(errorMessage);
                console.error('Login error:', error); // Log the full error for debugging
            }
        }
        
    })
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
        <div>
            <input
                type='email'
                name='email'
                placeholder='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null
            }
        </div>
        <div>
            <input
                type='password'
                name='password'
                placeholder='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null
            }
        </div>

        <button type='submit'>Login</button>
    </form>
    <ToastContainer />
    
    
    </>
  )
}

export default Login




// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: ''
//         },
//         validationSchema: Yup.object({
//             email: Yup.string()
//                 .email('Invalid email address')
//                 .required('Required'),
//             password: Yup.string()
//                 .required('Required')
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const response = await axios.post('http://127.0.0.1:5000/api/v1/login', values);
//                 localStorage.setItem('token', response.data.token);
//                 toast.success('Login successful');
//             } catch (error) {
//                 toast.error(error.response?.data?.error || 'Something went wrong');
//             }
//         }
//     });

//     return (
//         <>
//             <form onSubmit={formik.handleSubmit}>
//                 <div>
//                     <input
//                         type='email'
//                         name='email'
//                         placeholder='Email'
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.email && formik.errors.email ? (
//                         <div>{formik.errors.email}</div>
//                     ) : null}
//                 </div>
//                 <div>
//                     <input
//                         type='password'
//                         name='password'
//                         placeholder='Password'
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.password && formik.errors.password ? (
//                         <div>{formik.errors.password}</div>
//                     ) : null}
//                 </div>
//                 <button type='submit'>Login</button>
//             </form>
//             <ToastContainer />
//         </>
//     );
// };

// export default Login;
