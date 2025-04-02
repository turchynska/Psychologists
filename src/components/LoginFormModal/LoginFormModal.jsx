import css from "./LoginFormModal.module.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Modal from "../Modal/Modal.jsx";

const LoginFormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Not a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be at most 25 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      await dispatch(loginUser(values)).unwrap();

      toast.success("You are logged in");
      resetForm();
      setIsModalOpen(false);
      navigate("/home");
    } catch (err) {
      toast.error(`Error fetching data: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className={css.mainContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Log In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default LoginFormModal;
