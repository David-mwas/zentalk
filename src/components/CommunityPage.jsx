"use client";
import React, { useEffect, useState } from "react";
import useAuthToken from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { convertDateTime } from "../../hooks/useDateTime";
import { useParams } from "react-router-dom";

function CommunityPage() {
  const { id } = useParams();
  const { getItem } = useAuthToken();
  const { chatid } = getItem();
  //   const chatid = localStorage?.getItem("chatId");
  const { clearAuthToken } = useAuthToken();

  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(false);
  console.log(id);
  useEffect(() => {
    const fetchChatMessages = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/articles/${id}`
        );
        if (response.ok) {
          setLoading(false);

          const data = await response.json();
          console.log(data);
          setArticle(data);
        } else {
          throw new Error("Failed to fetch chat messages");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const unsubScribe = fetchChatMessages();
    return () => {
      unsubScribe;
    };
  }, []);
  const handleLogout = () => {
    clearAuthToken();
    window.location.href = "/chatlogin";
  };
  return (
    <div>
      <header className="w-screen flex justify-between items-center gap-2 px-4 md:px-20 py-4 fixed z-[999] h-[80px] shadow-lg bg-blue-500 text-white">
        <h1>
          <a href="/">InnerGlow</a>
        </h1>
        <nav className="flex justify-between items-center gap-4 md:gap-20 capitalize">
          <a href={`/community/articles`}>Articles</a>
          <a href={`/chat/${chatid}`}>chat</a>
          <a href="/history">history</a>
          <button
            onClick={handleLogout}
            className="bg-white p-2 rounded-lg px-4"
          >
            <span className="text-blue-500 font-semibold">Logout</span>
          </button>
        </nav>
      </header>
      {article ? (
        <div className="w-full flex flex-col gap-2  md:gap-4 pt-[100px] px-[20px] space-x-4 md:px-[80px]">
          <div>
            <p className="text-blue-500 font-semibold pt-2 text-2xl">
              {article?.title}
            </p>
            <p className="text-sm font-semibold">
              {convertDateTime(article?.time)}
            </p>
          </div>
          <div className="flex gap-2 pt-2 mt-[15px] mb-[15px]">
            <FaUser className="w-8 h-8 text-gray-500" />
            <p className="text-blue-500 ">
              by{" "}
              <span className="capitalize font-semibold">
                {article?.createdBy}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-red-400 w-full flex flex-col gap-2  md:gap-4 pt-[100px] px-[20px] space-x-4 md:px-[80px] p-8">
          <p className="text-slate-500 text-4xl">404, Not Found<br /> <br />No articles for now login/register to post an article</p>
        </div>
      )}
      {article ? (
        <div className="pt-[10px] p-[20px] md:px-20 md:pt-[10px]">
          <div className="w-full  flex  flex-col md:flex-row">
            <div className="bg-gray-400 h-[350px]">
              <img
                src={article?.image}
                alt="image"
                className="object-cover rounded-lg md:w-[400px] h-full hover:scale-105"
              />
            </div>

            <div className="px-2 md:py-0 py-6 w-full md:w-[600px] md:ml-[60px]">
              <p className="text-xl">{article?.description}</p>
            </div>
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default CommunityPage;
