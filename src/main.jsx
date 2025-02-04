import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/Navbar.jsx";

import store from "./app/store.js";

import App from "./App.jsx";
import Classes from "./pages/Classes.jsx";
import EditStudent from "./pages/EditStudent.jsx";
import PostStudent from "./pages/PostStudent.jsx";
import School from "./pages/School.jsx";
import Student from "./pages/Student.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/students",
        element: <Student />,
      },
      {
        path: "/students/:name/:studentID/edit-student",
        element: <EditStudent />,
      },
      {
        path: "/post-student",
        element: <PostStudent />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/school",
        element: <School />,
      },
      {
        path: "/students/:name/:studentID",
        element: <StudentDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
