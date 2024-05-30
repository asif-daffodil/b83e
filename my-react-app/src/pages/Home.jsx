import { Helmet } from "react-helmet";
import Hero from "../Components/Hero";
import OurTeam from "../Components/OurTeam";
import Pricing from "../Components/Pricing";
import Testimonial from "../Components/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>React Website</title>
            </Helmet>
            <Hero />
            <OurTeam />
            <Pricing />
            <Testimonial />
        </div>
    );
};

export default Home;