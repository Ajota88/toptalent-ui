import Hero from "../../components/hero/Hero";
import CategorySlider from "../../components/categorySlider/CategorySlider";
import Services from "../../components/services/Services";
import ExploreCategories from "../../components/exploreCategories/ExploreCategories";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <CategorySlider />
      <Services />
      <ExploreCategories />
    </div>
  );
};
export default Home;
