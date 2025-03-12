import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../components/layout/UserLayout";
import { Home } from "../pages/user/Home";
import { Contact } from "../pages/user/Contact";
import { MyLearnings } from "../pages/user/MyLearnings";
import { CoursePage } from "../pages/user/CoursePage";
import { CourseDetailsPage } from "../pages/user/CourseDetailsPage";
import { Login } from "../pages/shared/Login";
import { SignUp } from "../pages/shared/SignUp";
import { About } from "../pages/user/About";
import { Cart } from "../pages/user/Cart";
import { ErrorPage } from "../pages/shared/ErrorPage";
import React from "react";
import { CreateCoursePage } from "../pages/user/CreateCoursePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "contact", element: <Contact /> },
      { path: "course-details-page/:id", element: <CourseDetailsPage /> },
      { path: "course-page", element: <CoursePage /> },
      { path: "my-learnings", element: <MyLearnings /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "create-course-page", element: <CreateCoursePage/> },
    ],
  },
]);
