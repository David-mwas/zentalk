import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import image from "../assets/images/virtualA.svg";
import Donut from "./Donut";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import useAuthToken from "../../../hooks/useAuth";
function Login() {
  // const { getItem } = useAuthToken();
  // const { token } = getItem();

  // useEffect(() => {
  //   if (token) {
  //     loc
  //   }
  // })
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    const notify = toast.loading("Authenticating...");
    if (!email || !password) {
      toast.error("email and password are required!", { id: notify });
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
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
      if (response.status == 200) {
        toast.success("Logged in successfully", { id: notify });
        console.log("logged in successfully");
        const data = await response.json();
        localStorage.setItem("innerAuth", data?.access_token);
 const id = await getUser(data?.access_token);
        console.log(id);
        const uid = await getUserChat(id);
        window.location.href = "/community/articles";
      }
      if (response.status == 401) {
        toast.error("Wrong user credentials", { id: notify });
        console.log("logged in successfully");
      }
    } catch (error) {
      toast.error(error, { id: notify });
      console.error(error);
    }
  };
    const getUser = async (token) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status === 200) {
          const { userId } = await response.json();
          console.log(userId);
          return userId;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getUserChat = async (userId) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/chat/getuserchat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
            }),
          }
        );
        console.log(response);
        if (response?.status === 200) {
          const data = await response.json();
          console.log("data", data[0]._id);
          localStorage.setItem("chatId", data[0]?._id);
          return data[0]?._id;
          // console.log(data[0]._id);
        }
      } catch (error) {
        console.error(error);
      }
    };
  const showPassword = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Toaster />
      <div className="flex  w-screen item-center justify-center md:flex-row p-12   h-screen flex-col">
        <div className="absolute left-[-100px] top-[-200px] z-[-1]">
          <Donut />
        </div>
        <div className="flex items-center justify-center text-center w-full h-full gap-8">
          <div className="hidden md:flex h-[400px] rounded-2xl">
            <img
              src={image}
              alt="anxiety image"
              width={400}
              height={400}
              className="object-cover  object-top rounded-2xl"
            />
          </div>

          <div className="w-[100%] md:w-[30%] ">
            <div className="w-full">
              <h2 className="mt-4 text-center md:text-2xl font-extrabold w-full text-indigo-700 text-xl">
                Sign In to Your Account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                {" "}
                Or
                <a
                  href="/communitysignup"
                  className="font-medium text-indigo-600 hover:text-indigo-300 px-2"
                >
                  Sign Up
                </a>
              </p>
            </div>
            <div className="flex flex-col w-full mt-8 space-y-6">
              <form className="w-full rounded-md shadow-sm -space-y-px">
                {/* input code start */}

                <div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="none"
                    required
                    className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500
                 focus:border-indigo-500 focus:z-10 small:text-sm"
                    placeholder="Email address"
                  />
                </div>

                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={!isOpen ? "password" : "text"}
                    autoComplete="none"
                    required
                    className="appearance-none rounded-none relative block w-full py-2 px-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md mb-2 focus:outline-none focus:ring-indigo-500
                 focus:border-indigo-500 focus:z-10 small:text-sm"
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
                {/* input code end */}
              </form>
              {/* Remember me and forgot pasword start */}
              <div className="flex items-center justify-between">
                <div className="flex items-center ">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-300 "
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              {/* Remember me and forgot password end */}
              {/* button */}
              <div>
                <button
                  onClick={handleLogin}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-md rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <div className="absolute right-[-100px] bottom-[-200px] z-[-1]">
            <Donut />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
