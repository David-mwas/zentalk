import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import image from "../assets/images/virtualA.svg";
import Donut from "./Donut";
const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCPOpen, setIsCPOpen] = useState(false);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      console.log("passwords do not match");
      return;
    }

    try {
      // console.log(userName);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            email: email,
            password: password,
            confirm_password: confirmPassword,
          }),
        }
      );
      console.log(response);
      if (response.status === 200) {
        window.location.href = "/communitylogin";
      }
    } catch (error) {
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
    <div className="flex w-screen item-center justify-center md:flex-row p-12 h-screen flex-col">
      <div className="absolute top-[-200px] left-[-100px] z-[-1]">
        <Donut />
      </div>
      <div className="flex items-center justify-center text-center w-full h-full gap-8">
        <div className="hidden md:flex h-[400px] rounded-2xl">
          <img
            src={image}
            alt="anxiety img"
            width={400}
            height={200}
            className="object-cover  object-top rounded-2xl"
          />
        </div>
        <div className="w-[100%] md:w-[30%]">
          <div className="w-full">
            <h2 className="mt-4 text-center md:text-2xl font-extrabold w-full text-indigo-600 text-xl">
              Create an Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {" "}
              Or
              <a
                href="/communitylogin"
                className="font-medium text-indigo-600 hover:text-indigo-300 px-2"
              >
                Sign In
              </a>
            </p>
          </div>
          <form className="flex flex-col w-full mt-8 space-y-6">
            <div className="w-full rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  type="Name"
                  autoComplete="none"
                  required
                  className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500
                 focus:border-indigo-500 focus:z-10 small:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  autoComplete="none"
                  required
                  className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 small:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="relative">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={!isOpen ? "password" : "text"}
                  autoComplete="none"
                  required
                  className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 small:text-sm"
                  placeholder="Password"
                />
                <div
                  className="absolute right-2 top-[1px] z-[999] bg-white p-2 px-6"
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
              <div className="relative">
                <input
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  type={!isCPOpen ? "password" : "text"}
                  autoComplete="none"
                  required
                  className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 small:text-sm"
                  placeholder=" Confirm Password"
                />
                <div
                  className="absolute right-2 top-[1px] z-[999] bg-white p-2 px-6"
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
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-md rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="absolute bottom-[-200px] right-[-100px] z-[-1]">
          <Donut />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
