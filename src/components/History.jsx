import React, { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import {
  InfiniteMovingCardsPrevious30Days,
  InfiniteMovingCardsPrevious7Days,
  InfiniteMovingCardsToday,
} from "../components/MovingCard";
import useAuthToken from "../../hooks/useAuth";

function page() {
  const [data, setData] = useState();
  const { getItem, clearAuthToken } = useAuthToken();
  const { token, chatid } = getItem();
  const [isOpen, setIsOpen] = useState(false);
  const openNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          const dataRespo = await response.json();
          setData(dataRespo);
          console.log(dataRespo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => getUser();
  }, []);
  const handleLogout = () => {
    clearAuthToken();
    window.location.href = "/chatlogin";
  };
  return (
    <div className="justify-between flex flex-col">
      <header className="w-screen flex justify-between items-center gap-2 px-4 md:px-20 py-4 fixed z-[9999] h-[80px] shadow-lg bg-blue-500">
        <div className="flex items-center">
          <a href="/">
            <h1 className="text-white font-bold text-3xl">ZenTalk</h1>
          </a>
          {/* <img src="/innerglow.png" alt="Logo" className="mr-2" width={200} height={0}/> */}
        </div>
        <nav className="justify-between items-center gap-4 md:gap-20 capitalize hidden md:flex text-white font-bold">
          <a href="/community/articles">articles</a>
          <a href={`/chat/${chatid}`}>chat</a>

          <h3 className="text-lg p-2 rounded-lg px-4">
            Hi,{" "}
            <span className="text-blue-500 font-semibold">
              {data?.username}
            </span>
          </h3>
          <button
            onClick={handleLogout}
            className="bg-white p-2 rounded-lg px-4"
          >
            <span className="text-blue-500 font-semibold">Logout</span>
          </button>
        </nav>
        {isOpen && (
          <div
            className="md:hidden flex bg-blue-500 justify-center gap-[50px] font-semibold absolute w-[50vw] h-[100vh] flex-col items-start px-8 top-[90px] left-[-20px] shadow-md rounded-r-[30px] transition-transform ease-in-out duration-700 text-white"
            onClick={openNav}
          >
            <h3 className="text-lg p-2 rounded-lg">
              Hi,{" "}
              <span className="text-blue-500 font-semibold">
                {data?.username}
              </span>
            </h3>
            <a href="/community/articles">articles</a>
            <a href={`/chat/${chatid}`}>chat</a>

            <button
              onClick={handleLogout}
              className="bg-white p-2 rounded-lg px-4"
            >
              <span className="text-blue-500 font-semibold">Logout</span>
            </button>
          </div>
        )}
        <div className="space-y-[5px] md:hidden" onClick={openNav}>
          <div className="w-[25px] h-[3px] bg-white" />
          <div className="w-[25px] h-[3px] bg-white" />
          <div className="w-[25px] h-[3px] bg-white" />
        </div>
      </header>
      <div className="pt-[100px] md:px-[120px] px-4 flex flex-1 flex-col space-y-4 p-3  mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2 text-blue-500">Today</h3>
          <div className="grid grid-flow-col overflow-x-auto gap-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            <InfiniteMovingCardsToday />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-blue-500">
            Previous 7 Days
          </h3>
          <div className="grid grid-flow-col overflow-x-auto gap-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            <InfiniteMovingCardsPrevious7Days />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-blue-500">
            Previous 30 Days
          </h3>
          <div className="grid grid-flow-col overflow-x-auto gap-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            <InfiniteMovingCardsPrevious30Days />
          </div>
        </div>
      </div>
      <footer className="w-full  mt-4 text-center text-gray-500 text-sm shadow-lg shadow-black px-4 pt-4 py-4 sm:mb-0  bg-[#e9f1ff] md:px-[150px] sticky">
        <p>
          ZenTalk AI 2024.Al rights reserved.Terms of services and Privacy
          policy
        </p>
      </footer>
    </div>
  );
}

export default page;
