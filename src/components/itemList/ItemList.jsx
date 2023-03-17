import coverPlaceholder from "../../assets/No_Image_Available.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudConfig, CloudinaryImage } from "@cloudinary/url-gen";
import "./ItemLis.scss";

const ItemList = ({ item }) => {
  let cloudConfig = new CloudConfig({ cloudName: "dk3psx2kr" });

  const orderImg = new CloudinaryImage(item?.img, cloudConfig);
  return (
    <tbody>
      <tr>
        <td>
          {!item?.img ? (
            <img src={coverPlaceholder} alt="" className="image" />
          ) : (
            <AdvancedImage cldImg={orderImg} className="image" />
          )}
        </td>
        <td>{item.title || "placeholder title"}</td>
        <td>{item.price}</td>
        <td>
          <FontAwesomeIcon icon={faMessage} />
        </td>
      </tr>
    </tbody>
  );
};
export default ItemList;
