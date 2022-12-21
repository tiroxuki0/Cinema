import React from "react";
import HeroSlider from "../components/sliders/HeroSlider";
import FeaturedSlider from "../components/sliders/FeaturedSlider";
import SectionsHead from "../components/common/SectionsHead";
import TopProducts from "../components/movie/TopProducts";
import Services from "../components/common/Services";
import useDocTitle from "../hooks/useDocTitle";

const Home = () => {
  useDocTitle("Home | Awesome Cinema");

  return (
    <main>
      <section id="hero">
        <HeroSlider />
      </section>

      <section id="featured" className="section">
        <div className="container">
          <SectionsHead heading="Now Playing Movies" />
          <FeaturedSlider />
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <SectionsHead heading="Category Movies" />
          <TopProducts />
        </div>
      </section>
    </main>
  );
};

export default Home;
