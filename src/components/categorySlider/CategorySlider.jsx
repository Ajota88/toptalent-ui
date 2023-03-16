import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "../slide/Slide";
import CategoryCard from "../categoryCard/CategoryCard";
import { categories } from "../../mockData";
import "./CategorySlider.scss";

const CategorySlider = () => {
  return (
    <div>
      <Slide>
        {categories?.map((cat) => (
          <SwiperSlide key={cat.id}>
            <CategoryCard item={cat} />
          </SwiperSlide>
        ))}
      </Slide>
    </div>
  );
};
export default CategorySlider;
