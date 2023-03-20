import coverPlaceholder from "../../assets/No_Image_Available.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudConfig, CloudinaryImage } from "@cloudinary/url-gen";
import { useDeleteGigMutation } from "../../features/gigs/gigsSlice";
import "./ItemList.scss";

const ItemList = ({ item, listof }) => {
  let cloudConfig = new CloudConfig({ cloudName: "dk3psx2kr" });

  const [deleteGig, result] = useDeleteGigMutation();

  let orderImg;
  if (listof === "user gigs") {
    orderImg = new CloudinaryImage(item?.cover, cloudConfig);
  } else {
    orderImg = new CloudinaryImage(item?.img, cloudConfig);
  }

  return (
    <tbody>
      <tr>
        <td>
          {!(item?.img || item?.cover) ? (
            <img src={coverPlaceholder} alt="" className="image" />
          ) : (
            <AdvancedImage cldImg={orderImg} className="image" />
          )}
        </td>
        <td>{item.title || "placeholder title"}</td>
        <td>{item.price}</td>
        {listof === "user gigs" && <td>{item.sales || 0}</td>}
        <td>
          {listof === "user gigs" ? (
            <span>
              <FontAwesomeIcon
                onClick={() => deleteGig(item.id)}
                icon={faTrash}
              />
              <FontAwesomeIcon icon={faEdit} />
            </span>
          ) : (
            <FontAwesomeIcon icon={faMessage} />
          )}
        </td>
      </tr>
    </tbody>
  );
};
export default ItemList;
