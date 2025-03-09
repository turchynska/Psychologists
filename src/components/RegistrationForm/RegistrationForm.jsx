import css from './RegistrationForm.module.css';
import { auth, createUserWithEmailAndPassword } from "../../firebase.js";
import Modal from '../Modal/Modal.jsx';
import { useState } from 'react';
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Field, Formik, Form } from 'formik';


const RegistrationForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

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

  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("You are registered");
      navigate("/home");
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={css.mainContainer}>
          <div className={css.headerContainer}>
            <h3 className={css.title}>Registration</h3>
            <p className={css.text}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
          </div>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={css.fieldContainer}>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={css.field}
                  />
                  {errors.name && touched.name && (
                    <div className={css.error}>{errors.name}</div>
                  )}
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={css.field}
                  />
                  {errors.email && touched.email && (
                    <div className={css.error}>{errors.email}</div>
                  )}
                </div>
                <div className={css.passwordContainer}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={css.field}
                  />
                  {errors.password && touched.password && (
                    <div className={css.error}>{errors.password}</div>
                  )}
                  <button
                    type="button"
                    className={css.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <button type="submit" className={css.submitButton}>
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default RegistrationForm;