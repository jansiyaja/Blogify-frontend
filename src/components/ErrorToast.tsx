import React from "react";

const ErrorToast = ({ type, message }) => {
  return (
    <div
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 flex items-center gap-3 rounded-md shadow-lg bg-slate-50"
    >
     
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {type === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
                d="M12 8v4m0 4h.01"            />
          </svg>
        )}
      </div>
      
   
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default ErrorToast;
