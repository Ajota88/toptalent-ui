import React, { useState } from "react";
import { useRegisterUserMutation } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Register.scss";

function Register() {
  const [serverError, setServerError] = useState(null);
  const [registerUser, result] = useRegisterUserMutation();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Must Match")
      .required("Confirm your password"),
    email: yup.string().email("Email not valid").required("Email is required"),
    country: yup.string().required("Country is required"),
    isSeller: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      navigate("/login");
    } catch (err) {
      setServerError(err.data.message);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create a new account</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          {...register("username")}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <label htmlFor="">Email</label>
        <input
          name="email"
          type="email"
          placeholder="email"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="">Password</label>
        <input name="password" type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <label htmlFor="">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <label htmlFor="">Country</label>
        <input
          name="country"
          type="text"
          placeholder="Usa"
          {...register("country")}
        />

        <div className="toggle">
          <h2>I want to be a seller</h2>
          <label className="switch">
            <input type="checkbox" {...register("isSeller")} />
            <span className="slider round"></span>
          </label>
        </div>

        <button type="submit">Register</button>
        <p>{serverError}</p>
      </form>
    </div>
  );
}

export default Register;
