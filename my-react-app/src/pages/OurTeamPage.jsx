import { Helmet } from "react-helmet";
import OurTeam from "../Components/OurTeam";
import Pions from "../Components/Pions";


const OurTeamPage = () => {
    return (
        <>
        <Helmet>
            <title>Our Team</title>
        </Helmet>
            <OurTeam />
            <Pions />
        </>
    );
};

export default OurTeamPage;