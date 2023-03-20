import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "../slide/Slide";
import { useGetCategoriesQuery } from "../../features/categories/categoriesSlice";
import CategoryCard from "../categoryCard/CategoryCard";
import "./CategorySlider.scss";

const CategorySlider = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return <h2>Loaing...</h2>;
  }

  if (isError) {
    return null;
  }

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
