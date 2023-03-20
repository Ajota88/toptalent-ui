import { Link } from "react-router-dom";
import coverPlaceholder from "../../assets/No_Image_Available.jpg";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudConfig, CloudinaryImage } from "@cloudinary/url-gen";
import "./CategoryCard.scss";

const CategoryCard = ({ item }) => {
  let cloudConfig = new CloudConfig({ cloudName: "dk3psx2kr" });

  const myCover = new CloudinaryImage(item?.cover, cloudConfig);

  return (
    <div className="category">
      {!item?.cover ? (
        <img src={coverPlaceholder} alt="" />
      ) : (
        <AdvancedImage cldImg={myCover} />
      )}
      <span className="title">{item.name}</span>
    </div>
  );
};
export default CategoryCard;
