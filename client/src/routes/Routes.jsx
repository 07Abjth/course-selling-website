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
import { Wishlist } from "../pages/user/Wishlist";
import { Profile } from "../pages/user/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import { MentorLayout } from "../components/layout/MentorLayout";
 import {MentorHome} from "../pages/mentor/MentorHome";
import { ProtectedRoutesMentor } from "./ProtectedRoutesMentor";

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
      { path: "about", element: <About /> },
      { path: "course-details-page/:id", element: <CourseDetailsPage /> },
      { path: "course-page", element: <CoursePage /> },
     
      
      //Protected Routes
      {
        element: <ProtectedRoute />,
        path: "user",
        children: [
      { path: "wishlist", element: <Wishlist /> },
      { path: "create-course-page", element: <CreateCoursePage/> },
      { path: "profile", element: <Profile /> },
      { path: "my-learnings", element: <MyLearnings /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element:  <h1>order page</h1> },
    ],
       
    },

    ],
  },
  {
    path: "/mentor",
    element: <MentorLayout />,
    errorElement: <ErrorPage role= "mentor" />,
    children: [
      { index: true, element: <MentorHome/> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login role="mentor" /> },
       { path: "course-details-page/:id", element: <CourseDetailsPage /> },
     

      
      //Protected Routes
      {
        element: <ProtectedRoutesMentor />,
        path: "mentor",
        children: [
          { path: "courses", element: <CoursePage /> },
          { path: "create-course", element: <CreateCoursePage/> },
          { path: "profile", element: <Profile /> },
          { path: "track-progress", element: <Profile /> },
          { path: "user-data", element: <Profile /> },
    ],
       
    },

    ],
  },
]);