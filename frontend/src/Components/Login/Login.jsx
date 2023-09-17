import React, { useEffect } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Actions/User';
import { useFormik } from 'formik';
import { loginSchema } from '../Validation';
import toast from 'react-hot-toast';

const initialValues = {
  email: "",
  password: ""
};
const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } = useFormik(
    {
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        dispatch(loginUser(values.email, values.password));
      },
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative',
      bgcolor: 'primary.main',
      // color: 'secondary.main',
      height: '100vh'


    }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',
          width: {
            xs: '90%', // sets width to 90% on extra-small devices
            sm: '80%', // sets width to 80% on small devices
            md: '70%', // sets width to 70% on medium devices
            lg: '60%', // sets width to 60% on large devices
            xl: '50%', // sets width to 50% on extra-large devices
          },
          margin: 'auto',
          // bgcolor: 'primary.secondary',
          color: 'secondary.main',

        }}>

          <Typography>Login Here</Typography>
          <TextField
            label="Email"
            placeholder='Enter your email'
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3, bgcolor: 'secondary.main', borderRadius: '20px', borderColor: 'secondary.dark' }}
            name='email'
            fullWidth
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          {errors.email && touched.email && <Typography color="error">{errors.email}</Typography>}
          <TextField
            label="Password"
            placeholder='Enter your password'
            required
            variant="outlined"
            color="secondary"
            type="password"
            name='password'
            fullWidth
            sx={{ mb: 3, bgcolor: 'secondary.main', border: '10px', borderRadius: '20px', borderColor: 'secondary.main' }}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
          {errors.password && touched.password && <Typography color="error">{errors.password}</Typography>}
          <Button variant="outlined" color="secondary" size='large' type="submit" sx={{ width: '300px', bgcolor: 'secondary.main', color: 'secondary.dark' }}>Login</Button>
        </Box>
      </form>
      <Box sx={{ display: 'flex', justifyContent:'space-around' ,alignItems:'center',flexDirection:'column'}}>
        <Button variant='contained' href='/register' sx={{ maxWidth: '300px',margin:'20px' }}>Create Account</Button>

        <Button variant='contained' href='/forgot/password' sx={{ maxWidth: '300px' }}>Forgot Password</Button>
      </Box>
    </Box>


  )
}

export default Login
