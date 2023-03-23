import React, { useState } from "react";
import { useUpdateUserMutation } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./ProfilePage.scss";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

function Register() {
  const user = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  const [files, setFiles] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [updateUser, result] = useUpdateUserMutation();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    /*  password: yup.string().required("password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("Confirm password"), */
    country: yup.string().required("Country is required"),
    desc: yup.string().required("description is requried"),
    isSeller: yup.boolean(),
    phone: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: user?.country || "",
      desc: user?.desc || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateUser({ ...data, img: avatar }).unwrap();
      navigate("/");
    } catch (err) {
      setServerError(err.data);
    }
  };

  return (
    <div className="profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Your Profile</h1>
        <label htmlFor="">Profile Picture</label>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowFileEncode={true}
          name="avatar"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          onpreparefile={(file) => {
            setAvatar(file.getFileEncodeDataURL());
          }}
        />

        <label htmlFor="">Country</label>
        <input
          name="country"
          type="text"
          placeholder="Usa"
          {...register("country")}
        />
        {!user?.isSeller && (
          <>
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="">Activate the seller account</label>
              <label className="switch">
                <input type="checkbox" {...register("isSeller")} />
                <span className="slider round"></span>
              </label>
            </div>
          </>
        )}
        <label htmlFor="">Phone Number</label>
        <input
          name="phone"
          type="text"
          placeholder="+1 234 567 89"
          {...register("phone")}
        />
        <label htmlFor="">Description</label>
        <textarea
          placeholder="A short description of yourself"
          name="desc"
          id=""
          cols="30"
          rows="10"
          {...register("desc")}
        ></textarea>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Register;
