import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Slide.scss";

const Slide = ({ children }) => {
  return (
    <div className="slide">
      <div className="container">
        <h2>Popular professional services</h2>
        <Swiper
          className="mySwiper"
          modules={[Navigation]}
          navigation
          breakpoints={{
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
            400: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 30,
              slidesPerGroup: 3,
            },
            900: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 40,
            },
          }}
        >
          {children}
        </Swiper>
      </div>
    </div>
  );
};
export default Slide;
