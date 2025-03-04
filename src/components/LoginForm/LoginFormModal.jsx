import css from './LoginForm.module.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { auth, sigInWithEmailAndPassword } from '../../firebase.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 

const LoginFormModal = () => {
    const [showPassword, setShowPAssword] = useState(false)ж
    const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string.email("Not valid email").required("Email is required"),
    password: Yup.string
      .min(8, "Password must be  at least 8 characters")
      .max(25, "Password must be at maximum 25 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const userCredential = await sigInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
        toast.success("You are logged in", user);
        navigate("/home")
    } catch (err) {
      toast.error("Something went wrong", err);
    }
  };
  return (
    <div className={css.mainContainer}>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={css.containerForm}>
              <div className={css.containerTitle}>
                <h3 className={css.title}>Log In</h3>
                <p className={css.text}>
                  Welcome back! Please enter your credentials to access your
                  account and continue your search for a psychologist.
                </p>
              </div>

              <div className={css.fieldContainer}>
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

              <div className={css.fieldContainer}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={css.field}
                />
                {errors.password && touched.password && (
                  <div className={css.error}>{errors.password}</div>
                )}
                          </div>
                          <button type='button' className={css.togglePassword}
                              onClick={() => setShowPAssword(!showPassword)}>
                              {showPassword ? <FiEye/> : <FiEyeOff/>}
                          </button>

              <button type="submit" className={css.submitButton}>
                Log In
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginFormModal;