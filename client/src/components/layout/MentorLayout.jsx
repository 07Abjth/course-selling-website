import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MentorHeader } from "../mentor/MentorHeader"; // ✅ Separate header for mentors
import { Footer } from "../user/Footer"; // ✅ Reuse the same footer
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, saveUserData } from "../../redux/features/userSlice";
import { Header } from "../user/Header";

export const MentorLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location.pathname, "==== Mentor pathName");

  // ✅ Check mentor authentication
  const checkMentor = async () => {
    try {
      const response = await axiosInstance.get("/mentor/check-mentor/:id", {
        withCredentials: true,
      });
      dispatch(saveUserData(response.data));
      console.log(response, "========== checkMentor response");
    } catch (error) {
      dispatch(clearUserData());
      console.log(error, "=========== checkMentor error");
    }
  };

  useEffect(() => {
    checkMentor();
  }, [location.pathname]);

  console.log(isUserAuth, "isUserAuth");
  console.log(userData, "userData");

  return (
    <div>
      {/* Mentor Header */}
      {isUserAuth ? <MentorHeader /> : <Header />}

      {/* Main content */}
      <div>
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
