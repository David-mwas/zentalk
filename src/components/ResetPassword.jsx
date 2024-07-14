import toast, { Toaster } from "react-hot-toast";
import image from "../assets/images/virtualA.svg";
import React, { useEffect, useState } from "react";
import Donut from "./Donut";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
function ResetPassword({ token, email, isError }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCPOpen, setIsCPOpen] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState("");
  console.log(repeatPassword);
  console.log(email);
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const notification = toast.loading("Authenticating...");
    if (!repeatPassword || !password) {
      toast.error("Inputs below are required", { id: notification });
      return;
    }
    if (repeatPassword !== password) {
      toast.error("Passwords do not match", { id: notification });
      return;
    }
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPassword("");
      setRepeatPassword("");
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long."
      );
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.",
        {
          id: notification,
        }
      );
      console.error(passwordError);

      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      if (response.status == 200 || 202) {
        toast.success("password reset successfully", { id: notification });
        console.log(await response.json());
        console.log("logged in successfully");
      }
      if (response.status == 400) {
        toast.error("Failed to reset password!!", { id: notification });
        console.log("Invalid credentials!!", response);
        return;
      }

      //   const data = await response.json();
      window.location.href = `/chatlogin`;
    } catch (error) {
      //   toast.error(error, { id: notification });
      console.error(error);
    }
  };
  const showPassword = () => {
    setIsOpen(!isOpen);
  };
  const showCPassword = () => {
    setIsCPOpen(!isCPOpen);
  };
  return (
    <>
      <Toaster />
      <div className="flex  w-screen item-center justify-center md:flex-row p-12   h-screen flex-col">
        <div className="flex items-center justify-center text-center w-full h-full gap-8">
          <div className="absolute top-[-200px] left-[-100px] z-[-1]">
            <Donut />
          </div>
          <div className="hidden md:flex h-[400px] rounded-2xl">
            <img
              src={image}
              alt="anxiety img"
              width={400}
              height={400}
              className="object-cover  object-top rounded-2xl"
            />
          </div>

          <div className="w-[100%] md:w-[30%] ">
            <div className="w-full">
              <h2 className="mt-4 text-center md:text-2xl font-extrabold w-full text-indigo-700 text-xl">
                Reset your password
              </h2>
            </div>
            <form className="flex flex-col w-full mt-8 space-y-6">
              <div className="w-full rounded-md shadow-sm -space-y-px">
                {/* input code start */}

                <div className="flex flex-col mb-1 relative">
                  <label
                    htmlFor="password"
                    className="text-left text-sm font-bold text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={!isOpen ? "password" : "text"}
                    autoComplete="none"
                    required
                    className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-300 placeholder-gray-500 text-gray-900 mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 small:text-sm"
                    placeholder="Enter new password"
                  />
                  <div
                    className="absolute right-2 top-[25px] z-[999] bg-white p-2 px-6"
                    onClick={showPassword}
                  >
                    {isOpen ? (
                      <FaRegEye
                        className="text-blue-700 font-bold  h-6
                    w-6"
                      />
                    ) : (
                      <FaRegEyeSlash
                        className=" text-blue-700 font-bold  h-6
                    w-6"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-1 relative">
                  <label
                    htmlFor="password"
                    className="text-left text-sm font-bold text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    type={!isCPOpen ? "password" : "text"}
                    autoComplete="none"
                    required
                    className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-300 placeholder-gray-500 text-gray-900 mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 small:text-sm"
                    placeholder=" Confirm New Password"
                  />
                  <div
                    className="absolute right-2 top-[25px] z-[999] bg-white p-2 px-6"
                    onClick={showCPassword}
                  >
                    {isCPOpen ? (
                      <FaRegEye
                        className="text-blue-700 font-bold  h-6
                    w-6"
                      />
                    ) : (
                      <FaRegEyeSlash
                        className=" text-blue-700 font-bold  h-6
                    w-6"
                      />
                    )}
                  </div>
                </div>
                {passwordError && (
                  <span className="text-red-500">{passwordError}</span>
                )}
              </div>
              <div>
                <button
                  disabled={isError}
                  onClick={handlePasswordReset}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-md rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
          <div className="absolute bottom-[-200px] right-[-100px] z-[-1]">
            <Donut />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
