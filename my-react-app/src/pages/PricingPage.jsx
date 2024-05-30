import { Helmet } from "react-helmet";
import Pricing from "../Components/Pricing";

const PricingPage = () => {
    return (
        <>
            <Helmet>
                <title>Pricing</title>
            </Helmet>
            <Pricing />
        </>
    );
};

export default PricingPage;