import css from './LoginForm.module.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { auth, sigInWithEmailAndPassword } from '../../firebase.js';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginFormModal = () => {
    const initialValues = {
        email: '',
        password: ''
    }
    
    const validationSchema = Yup.object({
        email: Yup.string.email("Not valid email").required("Email is required"),
        password: Yup.string
            .min(8, "Password must be  at least 8 characters")
            .max(25, "Password must be at maximum 25 characters")
            .required("Password is required"),
    });

    const handleSubmit = async (values) => {
        try {
            const userCredential= await si
        }
    }
}