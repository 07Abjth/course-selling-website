import React from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";

export const Profile = () => {
  const { data: profile, isLoading, error } = useFetch("user/profile");
  const { isUserAuth } = useSelector((state) => state.user);

  if (!isUserAuth) {
    return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>

      {isLoading ? (
        <p>Loading profile...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching profile</p>
      ) : profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phoneNumber || "Not provided"}</p>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};
