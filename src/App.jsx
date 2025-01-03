import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useUser } from "./context/userContext";

// Components IMPORTS
import AddProject from "./components/AddProject/AddProject";
import UserProfile from "./components/UserProfile/UserProfile";
import Register from "./components/Register/Register";
import User from "./pages/User/User";
import Sign from "./components/Sign/Sign";
import Home from "./pages/Home/Home";
import Root from "./pages/Root";
import Empower from "./pages/Empower/Empower";
import TextEditor from "./components/TextEditor/TextEditor";
import Job from "./components/Job/Job";
import { UserProvider } from "./context/userContext";
import About from "./components/About/About";
import Hero from "./components/Hero/Hero";
import JobSide from "./pages/JobSide/JobSide";

function App() {
  const { user } = useUser();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/auth",
          element: <Register />,
        },
        {
          path: "/sign",
          element: <Sign />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/about",

          element: <About />,
        },
        {
          path: "/hero",

          element: <Hero />,
        },

        {
          path: "/createPost",
          element: <TextEditor />,
        },
        {
          path: "/job",
          element: <Job />,
        },
        {
          path: "/user",

          element: <User />,
        },
        {
          path: "/userProfile",
          element: <UserProfile />,
        },
        {
          path: "/addproject",
          element: <AddProject />,
        },

        {
          path: "/empower",
          element: <Empower />,
        },
        {
          path: "/js",
          element: <JobSide />,
        },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
