import css from './RegistrationForm.module.css';
import { auth } from '../../firebase.js'
import { createUserWithEmailAndPassword } from '../../firebase.js/auth';
import Modal from '../Modal/Modal.jsx';
import { useState } from 'react';
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";


const RegistrationForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const initialValue = {
        name: '',
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),

        email: Yup.string()
          .email("Not a valid email")
            .required("Email is required"),
        
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .max(25, "Password must be at most 25 characters")
          .required("Password is required"),
    });
    
    const handleSubmit = async(values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
      const user = userCredential.user;
      toast.success("You are register in");
      navigate("/home");
        } catch (error) {
            toast.error("Something went wrong: " + err.message);
}
    }
    
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                
            </Modal>
        </>
    )
}

