// import React from "react";
// import { useSelector } from "react-redux";
// import { useFetch } from "../../hooks/useFetch";
// import { axiosInstance } from "../../config/axiosInstance";

// export const Profile = () => {
//   const { data: profile, isLoading, error } = useFetch("/user/profile");
//   const { isUserAuth } = useSelector((state) => state.user);

//   if (!isUserAuth) {
//     return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;
//   }

//   const userLogout = async () => {
//     try {
//       await axiosInstance.post("/user/logout");
//       window.location.href = "/"; // ✅ Redirect after logout
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };
  
  

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
//       <h2 className="text-xl font-bold mb-4">User Profile</h2>

//       {isLoading ? (
//         <p>Loading profile...</p>
//       ) : error ? (
//         <p className="text-red-500">Error fetching profile</p>
//       ) : profile?.user ? (
//         <div>
//           <p><strong>Name:</strong> {profile.user.name || "N/A"}</p>
//           <p><strong>Email:</strong> {profile.user.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {profile.user.phoneNumber || "Not provided"}</p>
//           <img src={profile.user.profilePic} alt="Profile" className="w-24 h-24 rounded-full mt-4" />
//         </div>
//       ) : (
//         <p>No profile data found.</p>
//       )}

//       <button 
//         className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
//         onClick={userLogout}  
//       >
//         Log Out
//       </button>
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";

export const Profile = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile", { withCredentials: true });
        console.log("✅ Profile Data:", response.data); // Debugging log
        setProfile(response.data?.user || null); // ✅ Corrected access to user data
      } catch (error) {
        console.error("🚨 Error fetching profile:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (!isUserAuth) {
    return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;
  }

  const userLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading profile...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching profile</p>
      ) : profile ? ( // ✅ Ensure profile is not null
        <div>
          <p><strong>Name:</strong> {profile.name || "N/A"}</p>
          <p><strong>Email:</strong> {profile.email || "N/A"}</p>
          <p><strong>Phone:</strong> {profile.phoneNumber || "Not provided"}</p>
          <img src={profile.profilePic} alt="Profile" className="w-24 h-24 rounded-full mt-4" />
        </div>
      ) : (
        <p>No profile data found.</p>
      )}

      <button 
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
        onClick={userLogout}  
      >
        Log Out
      </button>
    </div>
  );
};
