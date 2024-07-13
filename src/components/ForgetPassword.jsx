import { useEffect, useState } from "react";
import ResetPassword from "./ResetPassword";
import { useLocation, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { FaArrowAltCircleLeft } from "react-icons/fa";
export default function ForgetPassword() {
  const { token } = useParams();
  const { pathname } = useLocation();
  const [email, setEmail] = useState();
  console.log(token);
  const [isError, setError] = useState(false);
  useEffect(() => {
    console.log("run");
    HandleFetchUser();
  }, []);
  const HandleFetchUser = async (params) => {
    // const notify = toast.loading("verifying user...");
    try {
      const data = await fetch(
        `http://localhost:5000/api/v1/auth/reset-password?token=${token}`
      );
      if (data?.status == 200) {
        toast.success("verified");
        const response = await data?.json();
        setEmail(response?.email);
        console.log("from dara", response);
        return response;
      }
      if (data?.status == 400) {
        setError(true);
        const response = await data?.json();
        toast.error(response?.message);
        console.log("from dara", response);
        return response;
      }
      return response;
      // Return the response data if needed
    } catch (error) {
      setError(true); // Set error state
      toast.error(error?.message);
      console.error("Error fetching user:", error);
      throw error; // Rethrow the error to handle it in the calling code if needed
    }
  };

  return (
    <div className="">
      <Toaster />
      {!isError ? (
        <ResetPassword token={token} email={email}/>
      ) : (
        <div>
          <div className="bg-slate-800 w-full  h-screen flex justify-center items-center text-white flex-col gap-2 space-y-4 px-4">
            <h1 className="text-4xl font-bold truncate w-full">
              404 <br />
              Page Not Found <br />
              for path {pathname}
            </h1>
            <p>Invalid link. please use the link sent to your email...</p>
            <a
              href="/"
              className="flex items-center justify-center gap-2 text-blue-500 font-bold text-lg underline-offset-4 underline"
            >
              <FaArrowAltCircleLeft />
              <p>Go Back Home</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
