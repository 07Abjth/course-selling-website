import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import React from "react";

const App = () => {
  
  return <RouterProvider router={router} />;
  
};

export default App;
