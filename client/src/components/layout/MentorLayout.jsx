import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MentorHeader } from "../mentor/MentorHeader";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearMentorData, saveMentorData } from "../../redux/features/mentorSlice";
import { MentorFooter } from "../mentor/MentorFooter";
import { SideBar } from "../mentor/SideBar";

export const MentorLayout = () => {
  const { isMentorAuth, mentorData } = useSelector((state) => state.mentor);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location.pathname, "==== Mentor pathName");

  // ✅ Check mentor authentication
  const checkMentor = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/mentor/check-mentor",
      });

      dispatch(saveMentorData(response.data));
      console.log(response, "========== checkMentor response");
    } catch (error) {
      dispatch(clearMentorData());
      console.log(error, "=========== checkMentor error");
    }
  };

  console.log(isMentorAuth, "isMentorAuth");
  console.log(mentorData, "mentorData");

  useEffect(() => {
    checkMentor();
  }, [location.pathname]); 

  return (
    <div className="flex flex-row">
      <div className="w-2/12 shadow-lg">
        <SideBar />
      </div>

      <div className="w-full">
        <MentorHeader />

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
