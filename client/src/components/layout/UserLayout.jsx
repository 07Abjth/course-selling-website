import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../user/Header";
import { UserHeader } from "../user/UserHeader";
import { Footer } from "../user/Footer";

export const UserLayout = () => {
  const [isUserAuth, setIsUserAuth] = useState(false);

  // Check login state when component loads
  useEffect(() => {
    const user = localStorage.getItem("userToken"); // Assuming you store token in localStorage
    setIsUserAuth(!!user); // Convert to boolean (true if user exists)
  }, []);

  return (
    <div>
      {/* Show the correct header based on login state */}
      {isUserAuth ? <UserHeader /> : <Header />}

      {/* Main content */}
         <Outlet />
 
      {/* Footer */}
      <Footer />
    </div>
  );
};
