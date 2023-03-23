import { useState } from "react";
import coverPlaceholder from "../../assets/No_Image_Available.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudConfig, CloudinaryImage } from "@cloudinary/url-gen";
import { useDeleteGigMutation } from "../../features/gigs/gigsSlice";
import Modal from "react-modal";
import "./ItemList.scss";

const ItemList = ({ item, listof }) => {
  let cloudConfig = new CloudConfig({ cloudName: "dk3psx2kr" });

  const [deleteGig, result] = useDeleteGigMutation();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
          <Link to={`/gigs/${listof === "user gigs" ? item.id : item.gigId}`}>
            {!(item?.img || item?.cover) ? (
              <img src={coverPlaceholder} alt="" className="image" />
            ) : (
              <AdvancedImage cldImg={orderImg} className="image" />
            )}
          </Link>
        </td>
        <td>{item.title || "placeholder title"}</td>
        <td>{item.price}</td>
        {listof === "user gigs" && <td>{item.sales || 0}</td>}
        <td>
          {listof === "user gigs" ? (
            <span>
              <FontAwesomeIcon onClick={openModal} icon={faTrash} />
              <FontAwesomeIcon icon={faEdit} />
            </span>
          ) : (
            <FontAwesomeIcon icon={faMessage} />
          )}
        </td>
      </tr>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="mobile menu"
        closeTimeoutMS={200}
        className="Delete"
        overlayClassName="DeleteOverlay"
      >
        <h2>Are you sure you want to delete your Gig?</h2>
        <div className="buttons-container">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={() => deleteGig(item.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </Modal>
    </tbody>
  );
};
export default ItemList;
