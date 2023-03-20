import React, { useState } from "react";
import { useRegisterUserMutation } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Register.scss";

function Register() {
  const [avatar, setAvatar] = useState("");
  const [serverError, setServerError] = useState(null);
  const [registerUser, result] = useRegisterUserMutation();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("password is required"),
    email: yup.string().email("Email not valid").required("Email is required"),
    country: yup.string().required("Country is required"),
    desc: yup.string().required("description is requried"),
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
      setServerError(err.response.data);
    }
  };

  //encode image base64
  const readImage = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
  };

  const handleAvatar = (e) => {
    readImage(e.target.files[0]);
  };
  //////////////////////////////////////////

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            {...register("username")}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            {...register("email")}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" {...register("password")} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={handleAvatar} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            {...register("country")}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" {...register("isSeller")} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input name="phone" type="text" placeholder="+1 234 567 89" />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            {...register("desc")}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
