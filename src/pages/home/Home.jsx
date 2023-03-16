import Hero from "../../components/hero/Hero";
import Slide from "../../components/slide/Slide";
import Services from "../../components/services/Services";
import ExploreCategories from "../../components/exploreCategories/ExploreCategories";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Slide />
      <Services />
      <ExploreCategories />
    </div>
  );
};
export default Home;
