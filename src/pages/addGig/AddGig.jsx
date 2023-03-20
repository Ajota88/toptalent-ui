import { useState } from "react";
import { useAddGigMutation } from "../../features/gigs/gigsSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./AddGig.scss";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

const AddGig = () => {
  const [cover, setCover] = useState("");
  const [files, setFiles] = useState([]);
  const [addGig, result] = useAddGigMutation();
  const navigate = useNavigate();

  //Create Select
  const components = {
    DropdownIndicator: null,
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  //////////////////////////////////////////////////////////

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    desc: yup.string().required("desc is required"),
    category: yup.string().required("Category is required"),
    price: yup.number().required("price is required"),
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
      await addGig({ ...data, cover }).unwrap();
      navigate("/gigs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add new Gig</h1>
        <form className="sections" onSubmit={handleSubmit(onSubmit)}>
          <div className="left">
            <label htmlFor="">Title</label>
            <input type="text" {...register("title")} />
            <label htmlFor="">Category</label>
            <select name="categories" id="cats" {...register("category")}>
              <option value="design">Design</option>
              <option value="web">Web Develpment</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowFileEncode={true}
              name="avatar"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              onpreparefile={(file) => {
                setCover(file.getFileEncodeDataURL());
              }}
            />
            <label htmlFor="">Gig Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              {...register("desc")}
            ></textarea>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input type="text" />
            <label htmlFor="">Short Description</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <label htmlFor="">Delivery Time</label>
            <input type="number" min={1} />
            <label htmlFor="">Revision Number</label>
            <input type="number" />
            <label htmlFor="">Add Features</label>
            <CreatableSelect
              components={components}
              inputValue={inputValue}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={(newValue) => setValue(newValue)}
              onInputChange={(newValue) => setInputValue(newValue)}
              onKeyDown={handleKeyDown}
              placeholder="Type something and press enter..."
              value={value}
            />
            <input type="number" {...register("price")} />
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddGig;
