import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MentorHeader } from "../mentor/MentorHeader";
import { Footer } from "../user/Footer"; // ✅ Reuse the same footer
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, saveUserData } from "../../redux/features/userSlice";
import { Header } from "../user/Header";
import { MentorFooter } from "../mentor/MentorFooter";
import { SideBar } from "../mentor/SideBar";

export const MentorLayout = () => {
  const { isMentorAuth, userData } = useSelector((state) => state.user);
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

  console.log(isMentorAuth, "isMentorAuth");
  console.log(userData, "userData");

  return (
    <div className="flex flex-row">
      <div className="w-2/12 shadow-lg">
      <SideBar/>
      </div>

      <div className="w-full">
      <MentorHeader/>

{/* Main content */}
<div>
  <Outlet />
</div>

{/* Footer */}
<MentorFooter />
      </div>

    </div>
  );
};
