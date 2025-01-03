import About from "../../components/About/About";

import Feature from "../../components/Feature/Feature";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <About />
      <Feature />
    </div>
  );
};

export default Home;
