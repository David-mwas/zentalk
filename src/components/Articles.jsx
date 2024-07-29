import React, { useEffect, useState } from "react";
import useAuthToken from "../../hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import img from "../assets/images/anxiety.jpg";
import image from "../assets/images/zen2.png";
import SingleArticle from "./SingleArticle";
import Model from "./Model";
import toast, { Toaster } from "react-hot-toast";
function Articles() {
  const [loading, setLoading] = useState(false);
  const { clearAuthToken, getItem } = useAuthToken();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { chatid, token } = getItem();
  const [articles, setArticles] = useState();
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const openNav = () => {
    setIsOpen(!isOpen);
  };
  // const articleData = [
  //   {
  //     title: "Anxiety",
  //     _id: "99999999999jjuju89juuu",
  //     description:
  //       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, fugiat dolores et ab quos eveniet hic sed aspernatur deleniti quaerat.",
  //     category: "Anxiety",
  //     createdBy: "David",
  //     time: Date.now(),
  //     image: img,
  //   },
  //   {
  //     title: "Anxiety",
  //     _id: "89ijuy777hjuuu77",
  //     description:
  //       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, fugiat dolores et ab quos eveniet hic sed aspernatur deleniti quaerat.y",
  //     category: "Anxiety",
  //     createdBy: "David",
  //     time: Date.now(),
  //     image: img,
  //   },
  // ];
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
    const unsubScribe = fetchArticlePosts();
    return () => {
      unsubScribe;
    };
  }, []);
  const fetchArticlePosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
      if (response.status == 200) {
        setLoading(false);

        const data = await response.json();
        // console.log(data);
        setArticles(data);
      }
      // if (response.status !== 200) {
      //   setLoading(false);
      //   data = articleData;

      //   // console.log(data);
      //   setArticles(data);
      // }
      // setArticles(articleData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const handleOpenModel = () => {
    if (token == "undefined" || token == null) {
      setIsModelOpen(false);
      toast.error("Unauthorized, Login first");
      window.location.href = "/communitylogin";
      return;
    } else {
      setIsModelOpen(true);
    }
  };
  const handleLogout = () => {
    clearAuthToken();
    window.location.href = "/communitylogin";
  };
  console.log(loading);
  return (
    <>
      <Toaster />
      <div className="relative h-screen">
        <header className="w-screen flex justify-between items-center gap-2 px-4 md:px-20 py-4 fixed z-[999] h-[80px] shadow-lg bg-blue-500 text-white bg-gradient-to-r from-blue-500 to-violet-500">
          <div className="flex items-center">
            <a href="/">
               <img src={image} alt="Logo" className="mr-8" width={200} height={0}/>
              {/* <h1 className="text-white font-bold text-3xl">ZenTalk</h1> */}
            </a>
           
          </div>
          <nav className="md:flex justify-between items-center gap-4 md:gap-20 capitalize hidden">
            <a href={`/chat/${chatid}`}>chat</a>
            <a href="/history">history</a>
            {token && (
              <h3 className="text-lg p-2 rounded-lg px-4">
                Hi,{" "}
                <span className="text-white font-semibold">
                  {data?.username}
                </span>
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
        <div className="md:px-[65px] pt-[100px]  px-[15px] w-screen">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-3xl font-semibold text-blue-500">Articles</h2>
            <button
              className="bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-white font-bold rounded-xl shadow-lg shadow-black flex items-center gap-2 hover:px-5 Get "
              onClick={handleOpenModel}
            >
              <FaPlus />
              <span>Create Article</span>
            </button>
          </div>
          <div className="px-[10px] w-full mt-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6 ">
            {!loading ? (
              articles ? (
                articles?.map((article, index) => (
                  <a href={`/community/articles/${article?._id}`}>
                    {" "}
                    <SingleArticle key={index} article={article} />
                  </a>
                ))
              ) : (
                <div>
                  <p className="text-lg text-slate-600 font-semibold">
                    No articles Found create
                  </p>
                </div>
              )
            ) : (
              <>
                <p className="text-lg text-slate-600 font-semibold">
                  Loading articles...
                </p>
              </>
            )}
          </div>
        </div>
        {isModelOpen && (
          <div className="absolute top-0">
            <Model
              setIsModelOpen={setIsModelOpen}
              handleFetch={fetchArticlePosts}
            />
          </div>
        )}
      </div>
      <footer className="w-full px-4 py-2 mt-4 text-center text-gray-500 text-sm ">
        <p>ZenTalk AI 2024. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Articles;
