import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import OurTeamPage from "./pages/OurTeamPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import JsonServerPage from "./pages/JsonServerPage";
import SingleJsonServerPage from "./pages/SingleJsonServerPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/our-team", element: <OurTeamPage />},
        { path: "/pricing", element: <PricingPage />},
        { path: "/contact", element: <ContactPage />},
        { path: "/JSON-Server", element: <JsonServerPage />},
        { path: "/JSON-Server/:id", element: <SingleJsonServerPage />}
      ]
    },
  ]);

export default router;