import css from "./RegistrationForm.module.css";
import { registerUser } from "../../redux/auth/operations.js";
import Modal from "../Modal/Modal.jsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Field, Formik, Form } from "formik";

const RegistrationForm = ({ isOpen, onClose }) => {
   const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setLoading(true);
    try {
      
      const response = await dispatch(registerUser(values)).unwrap();

      // Якщо успішно, робимо наступні кроки
      console.log("Register success:", response);
      toast.success("You are registered!");
      resetForm();
      onClose(); // Закриває модалку
      navigate("/"); // Перенаправляє на головну сторінку
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.mainContainer}>
        <div className={css.headerContainer}>
          <h3 className={css.title}>Registration</h3>
          <p className={css.text}>
            Thank you for your interest in our platform! In order to register,
            we need some information.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
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

              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting || loading}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default RegistrationForm;
