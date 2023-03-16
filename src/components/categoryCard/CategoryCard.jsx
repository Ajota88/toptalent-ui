import { Link } from "react-router-dom";
import "./CategoryCard.scss";

const CategoryCard = ({ item }) => {
  return (
    <div className="category">
      <img src={item.img} alt={item.title} />
      <span className="desc">{item.description}</span>
      <span className="title">{item.title}</span>
    </div>
  );
};
export default CategoryCard;
