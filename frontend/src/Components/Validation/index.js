import * as Yup from  'yup';

export const loginSchema=Yup.object({
//     name:Yup.string().min(2).max(25).required('Your name is required'),
    email:Yup.string().email().required('Email is required'),
    password:Yup.string().min(6).max(25).required('Password is required'),
});