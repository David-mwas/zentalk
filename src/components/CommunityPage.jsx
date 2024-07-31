import React, { useEffect, useState } from "react";
import useAuthToken from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import image from "../assets/images/zen2.png";
import { convertDateTime } from "../../hooks/useDateTime";
import { useParams } from "react-router-dom";
import { splitTextIntoParagraphs } from "../../hooks/useParagraph";
// var parText=
function CommunityPage() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const { getItem } = useAuthToken();
  const { chatid, token } = getItem();
  //   const chatid = localStorage?.getItem("chatId");
  const { clearAuthToken } = useAuthToken();
  const [data, setData] = useState();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
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
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          const { userProfile } = await response.json();
          setData(userProfile);
          console.log(userProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => getUser();
  }, []);
  useEffect(() => {
    const fetchChatMessages = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/articles/${id}`
        );
        if (response?.ok) {
          setLoading(false);

          const data = await response.json();
          console.log(data.description);
          setArticle(data);
        } else {
          setIsLoading(false);
          throw new Error("Failed to fetch chat messages");
        }
      } catch (error) {
        setIsLoading(false);
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
    window.location.href = "/communitylogin";
  };

  // const paragraphs = splitTextIntoParagraphs();
  const { description } = article;

  const formattedText = splitTextIntoParagraphs(description);
  console.log(description);

  formattedText.split("\n\n").map((paragraph, index) => console.log(paragraph));

  return (
    <div>
      <header className="w-screen flex justify-between items-center gap-2 px-4 md:px-20 py-4 fixed z-[999] h-[80px] shadow-lg bg-blue-500 text-white">
        <div className="flex items-center">
          <a href="/">
            <img
              src={image}
              alt="Logo"
              className="mr-8"
              width={200}
              height={0}
            />
            {/* <h1 className="text-white font-bold text-3xl">ZenTalk</h1> */}
          </a>
        </div>
        <nav className="hidden md:flex justify-between items-center gap-4 md:gap-20 capitalize">
          <a href={`/community/articles`}>Articles</a>
          <a href={`/chat/${chatid}`}>chat</a>
          <a href="/history">history</a>
          {token && (
            <h3 className="text-lg rounded-lg ">
              Hi,{" "}
              <span className="text-white font-semibold">{data?.username}</span>
            </h3>
          )}
          <button
            onClick={handleLogout}
            className="bg-white p-2 rounded-lg px-4"
          >
            <span className="text-blue-500 font-semibold">Logout</span>
          </button>
        </nav>
        {isOpen && (
          <div
            className="md:hidden flex bg-blue-500 justify-center gap-[50px] font-semibold absolute w-[75vw] h-[100vh] flex-col items-start px-12 top-[90px] left-[-20px] shadow-md rounded-r-[30px] transition-transform ease-in-out duration-700 z-[888] text-white bg-gradient-to-b from-blue-500 to-violet-500"
            onClick={openNav}
          >
            {/* <a href="/history">history</a> */}
            {token && (
              <h3 className="text-lg rounded-lg ">
                Hi,{" "}
                <span className="text-white font-semibold capitalize">
                  {data?.username}
                </span>
              </h3>
            )}
            <a href={`/community/articles`}>Articles</a>
            <a href={`/chat/${chatid}`}>chat</a>
            <a href="/history">history</a>
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
      {article ? (
        <div className="w-full flex flex-col gap-2  md:gap-4 pt-[100px] px-[20px] space-x-4 md:px-[80px]">
          <div>
            <p className="text-blue-500 font-semibold pt-2 text-2xl capitalize">
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
        isLoading && (
          <div>
            <p className="text-slate-400 text-xl m-12">Loading articles...</p>
          </div>
        )
      )}
      {article ? (
        <div className="pt-[10px] p-[20px] md:px-20 md:pt-[10px]">
          <div className="w-full  flex  flex-col md:flex-row">
            <div className=" h-[350px] w-full md:w-[400px]">
              <img
                src={article?.image}
                alt="image"
                className="object-cover rounded-lg  h-full hover:scale-105 w-full"
              />
            </div>

            <div className="gap-6 flex flex-col px-2 md:py-0 py-6 w-full md:w-[600px] md:ml-[60px]">
              {formattedText.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed font-sans text-gray-800 "
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <footer className="shadow  w-full px-4 py-2 mt-4 text-center text-gray-500 text-sm">
        <p>ZenTalk AI 2024. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CommunityPage;
