import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import SuccessPasswordReset from "../components/SuccessPasswordReset";
import ErrorPasswordReset from "../components/ErrorPasswordReset";
import Donut from "./Donut";
import image from "../assets/images/virtualA.svg";
function PasswordReset() {
  const [email, setEmail] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    const notification = toast.loading("Authenticating...");
    if (!email) {
      toast.error("Email is required", { id: notification });
      return;
    }
    const emailRegex =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!emailRegex.test(email)) {
      toast.error(email + " is invalid email address", { id: notification });
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      if (response.status == 200) {
        setIsSuccess(true);
        toast.success("change password link sent to the user email", {
          id: notification,
        });
        console.log(await response.json());
        console.log("logged in successfully");
      }
      if (response.status == 400) {
        toast.error("Failed to reset password!!, Invalid credentials!!", {
          id: notification,
        });
        console.log("Invalid credentials!!", response);
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data?.error) {
        toast.error(data?.error, { id: notification });
      }

      // window.location.href = `/chat/${chatid}`;
    } catch (error) {
      toast.error("Error", { id: notification });
      console.error(error);
    }
  };
  return (
    <div className="flex  w-screen items-center justify-center md:flex-row p-8    h-screen flex-col">
      <div className="absolute top-[-200px] left-[-100px] z-[-1]">
        <Donut />
      </div>
      <div className="hidden md:flex h-[400px] rounded-2xl mr-6">
        <img
          src={image}
          alt="virtualAssistant img"
          width={400}
          height={200}
          className="object-cover  object-top rounded-2xl"
        />
      </div>
      <Toaster />
      {isSuccess ? (
        <SuccessPasswordReset email={email} />
      ) : (
        <>
          {" "}
          {/* <ErrorPasswordReset /> */}
          <form className="w-full bg-gray-200 p-6 space-y-4 md:p-4 rounded-lg md:rounded-xl md:max-w-[380px]  justify-center flex flex-col px-md">
            <p className="text-blue-500 font-bold text-xl tracking-widest">
              Forgot your Password?
            </p>
            <p className="my-5 md:my-7">
              Your password will be reset by email.
            </p>
            <div className="flex flex-col mb-1">
              <label
                htmlFor="email"
                className="text-sm text-left text-gray-900 font-bold mb-2"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="none"
                required
                className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500
                 focus:border-indigo-500 focus:z-10 small:text-sm"
                placeholder="Enter your email address"
              />
            </div>
            <button
              onClick={handleSubmitEmail}
              className="w-full bg-blue-500 py-2 rounded-md text-white"
            >
              Next
            </button>
            <a
              href="/chatlogin"
              className="text-blue-500 w-full text-center mt-3"
            >
              Back to login
            </a>
          </form>
        </>
      )}
      <div className="absolute bottom-[-200px] right-[-100px] z-[-1]">
        <Donut />
      </div>
    </div>
  );
}

export default PasswordReset;
