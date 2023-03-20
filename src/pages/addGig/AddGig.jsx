import { useState } from "react";
import { useAddGigMutation } from "../../features/gigs/gigsSlice";
import { useGetCategoriesQuery } from "../../features/categories/categoriesSlice";
import { useNavigate } from "react-router-dom";
import { useForm, useController } from "react-hook-form";
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

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  const options = categories?.map((cat) => ({
    value: cat.id,
    label: cat.name.toUpperCase(),
  }));

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

  //Form validation
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    desc: yup.string().required("desc is required"),
    categoryId: yup.number().required("Please select category"),
    price: yup.number().required("price is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    field: { value: catValue, onChange: catOnChange, ...restCatField },
  } = useController({ name: "categoryId", control });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await addGig({ ...data, cover, features: value }).unwrap();
      navigate("/gigs");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////////////////////////////////////////////////

  return (
    <div className="add">
      <div className="container">
        <h1>Add new Gig</h1>
        <form className="sections" onSubmit={handleSubmit(onSubmit)}>
          <div className="left">
            <label htmlFor="">Title</label>
            <input type="text" {...register("title")} />
            <label htmlFor="">Category</label>
            <Select
              className="select-input"
              placeholder="Select Category"
              isClearable
              options={options}
              value={
                catValue ? options.find((c) => c.value === catValue) : catValue
              }
              onChange={(option) => catOnChange(option ? option.value : option)}
              {...restCatField}
            />
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
            <label htmlFor="">Price</label>
            <input type="number" {...register("price")} />
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddGig;
