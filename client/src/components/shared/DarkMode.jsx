import React, { useEffect, useState } from "react";

export const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", isDarkMode ? "light" : "dark");
    localStorage.setItem("theme", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
    >
      {isDarkMode === "dark" ? (
        // Sun Icon (Light Mode)
        <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 4V2M12 22v-2M4.93 4.93l1.41-1.41M17.66 17.66l1.41-1.41M2 12H4M22 12h-2M4.93 19.07l1.41 1.41M17.66 6.34l1.41-1.41M12 6.5A5.5 5.5 0 1017.5 12 5.51 5.51 0 0012 6.5z"
          />
        </svg>
      ) : (
        // Moon Icon (Dark Mode)
        <svg className="h-6 w-6 text-gray-400" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"
          />
        </svg>
      )}
    </button>
  );
};
