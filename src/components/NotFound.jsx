import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
function NotFound() {
  const { pathname } = useLocation();
  return (
    <div className="bg-slate-800 w-full  h-screen flex justify-center items-center text-white flex-col gap-2 space-y-4">
      <h1 className="text-4xl font-bold">
        404 <br />Page Not Found <br />for path {pathname}
      </h1>
      <a
        href="/"
        className="flex items-center justify-center gap-2 text-blue-500 font-bold text-lg underline-offset-4 underline"
      >
        <FaArrowAltCircleLeft />
        <p>Go Back Home</p>
      </a>
    </div>
  );
}

export default NotFound;
