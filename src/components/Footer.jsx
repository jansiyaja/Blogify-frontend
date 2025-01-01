import React from "react";
import { Link } from "react-router-dom";


const Footer= () => {
 

  return (
    <footer className={`bg-gray-100 text-gray-800  py-4`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
         
        </div>


      </div>

      <div className="mt-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Blogify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
