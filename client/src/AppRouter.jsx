import { useRoutes } from "react-router-dom";
import Events from "./Components/Events.jsx";
import Facilities from "./Components/Facilities.jsx";
import FresherGuide from "./Components/FresherGuide.jsx";
import Home from "./Components/Home.jsx";
import Mess from "./Components/Mess.jsx";
import Rules from "./Components/Rules.jsx";
import Staff from "./Components/Staff.jsx";
import Vacancy from "./Components/Vacancy.jsx";
import Admin from "./Components/Admin.jsx";

const AppRouter = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/fresherguide", element: <FresherGuide/> },
    { path: "/rules", element: <Rules /> },
    { path: "/mess", element: <Mess /> },
    { path: "/facilities", element: <Facilities /> },
    { path: "/events", element: <Events /> },
    { path: "/vacancy", element: <Vacancy /> },
    {path: "/vacancy/admin",element:<Admin/>},
    { path: "/staff", element: <Staff /> },
  ]);

  return routes;
};

export default AppRouter;
