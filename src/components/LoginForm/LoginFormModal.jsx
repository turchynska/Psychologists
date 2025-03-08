import css from "./LoginFormModal.module.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { auth, signInWithEmailAndPassword } from "../../firebase.js"; 
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Modal from "../Modal/Modal.jsx";

const LoginFormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
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

  const handleSubmit = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(

        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      toast.success("You are logged in");
      navigate("/home");
    } catch (err) {
      toast.error("Something went wrong: " + err.message);
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={css.mainContainer}>
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
                    Log In
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



<symbol id="icon-close" viewBox="0 0 32 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.5" d="M24 8l-16 16"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.5" d="M8 8l16 16"></path>
</symbol>
<symbol id="icon-star" viewBox="0 0 32 32">
<path stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="2.4" d="M12.4 9.394l3.6-6.822 3.6 6.822c0.318 0.603 0.899 1.025 1.571 1.141l7.601 1.315-5.376 5.532c-0.475 0.489-0.697 1.171-0.6 1.846l1.098 7.635-6.922-3.404c-0.612-0.301-1.329-0.301-1.941 0l-6.922 3.404 1.098-7.635c0.097-0.675-0.125-1.357-0.6-1.846l-5.376-5.532 7.601-1.315c0.672-0.116 1.252-0.538 1.571-1.141zM29.035 11.579v0zM7.767 27.031c0 0 0 0 0 0h-0z"></path>
</symbol>
<symbol id="icon-heart" viewBox="0 0 32 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.4615" d="M27.787 6.147c-0.681-0.681-1.49-1.222-2.379-1.591s-1.844-0.559-2.807-0.559-1.917 0.19-2.807 0.559c-0.89 0.369-1.699 0.909-2.38 1.591l-1.413 1.413-1.413-1.413c-1.376-1.376-3.241-2.148-5.187-2.148s-3.811 0.773-5.187 2.148c-1.376 1.376-2.148 3.241-2.148 5.187s0.773 3.811 2.148 5.187l11.787 11.787 11.787-11.787c0.681-0.681 1.222-1.49 1.591-2.38s0.559-1.844 0.559-2.807-0.19-1.917-0.559-2.807c-0.369-0.89-0.909-1.699-1.591-2.38z"></path>
</symbol>
<symbol id="icon-eye-off" viewBox="0 0 32 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3.2" d="M23.92 23.92c-2.279 1.737-5.054 2.7-7.92 2.747-9.333 0-14.667-10.667-14.667-10.667 1.659-3.091 3.959-5.791 6.747-7.92M13.2 5.653c0.918-0.215 1.857-0.322 2.8-0.32 9.333 0 14.667 10.667 14.667 10.667-0.809 1.514-1.775 2.94-2.88 4.253M18.827 18.827c-0.366 0.393-0.808 0.708-1.298 0.927s-1.020 0.336-1.557 0.346c-0.537 0.009-1.071-0.089-1.569-0.291s-0.95-0.501-1.33-0.88c-0.38-0.38-0.679-0.832-0.88-1.33s-0.3-1.032-0.29-1.569c0.009-0.537 0.127-1.067 0.346-1.558s0.534-0.932 0.927-1.298"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3.2" d="M1.333 1.333l29.333 29.333"></path>
</symbol>
<symbol id="icon-eye" viewBox="0 0 32 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3.2" d="M1.333 16c0 0 5.333-10.667 14.667-10.667s14.667 10.667 14.667 10.667-5.333 10.667-14.667 10.667c-9.333 0-14.667-10.667-14.667-10.667z"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="3.2" d="M16 20c2.209 0 4-1.791 4-4s-1.791-4-4-4c-2.209 0-4 1.791-4 4s1.791 4 4 4z"></path>
</symbol>