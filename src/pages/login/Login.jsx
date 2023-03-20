import React, { useState } from "react";
import { useLoginMutation } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.scss";

function Login() {
  const [login, { data: userInfo, isError, isSuccess }] = useLoginMutation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("password is required"),
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
      await login(data).unwrap();
      navigate("/");
    } catch (error) {
      setError(error.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          {...register("username")}
        />
        {errors.username && (
          <p className="form-error">{errors.username.message}</p>
        )}

        <label htmlFor="">Password</label>
        <input name="password" type="password" {...register("password")} />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
        <button type="submit">Login</button>
        {error && error.message}
      </form>
    </div>
  );
}

export default Login;
