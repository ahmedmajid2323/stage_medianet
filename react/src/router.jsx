import {createBrowserRouter} from "react-router-dom";
import Home from "./views/homepage/home";
import Account from "./views/user/account/Account";
import CVmaker from "./views/user/CVmaker/CVmaker";
import Signup from "./views/Signup";
import Opportunitites from "./views/user/opportunities/Opportunitites";
import Welcome from "./Welcome";

const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/user",
      element: <Account/>
    },
    {
      path: "user/CVmaker/:cv_id",
      element: <CVmaker/>
    },
    {
      path: "user/opportunities",
      element: <Opportunitites/>
    },
    {
      path: "/welcome/:token",
      element: <Welcome/>
    },
  ]);
  export default router ;