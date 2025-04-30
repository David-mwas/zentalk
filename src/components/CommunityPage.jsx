import { useEffect, useState } from "react";
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
  const [parse, setParse] = useState(null); // State for the parser

  const openNav = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const loadParser = async () => {
      const { default: parser } = await import("html-react-parser");
      setParse(() => parser); // Set the parser function in state
    };

    loadParser();
  }, []);

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
      <header className="w-screen flex justify-between items-center gap-2 px-4 lg:px-20 py-4 fixed z-[999] h-[80px] shadow-lg bg-blue-500 text-white">
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
        <nav className="lg:flex justify-center items-center gap-4 lg:gap-8 uppercase text-sm font-semibold  hidden">
          <a href={`/community/articles`}>Articles</a>
          <a href={`/chat/${chatid}`}>Chat</a>
          <a href="/community/stories">Stories</a>
          {token && (
            <h3 className="text-lg rounded-lg ">
              Hi,{" "}
              <span className="text-white font-semibold capitalize">
                {data?.username}
              </span>
            </h3>
          )}
        </nav>
        <button
          onClick={handleLogout}
          className="bg-white p-2 rounded-lg px-4 hidden lg:flex"
        >
          <span className="text-blue-500 font-semibold ">Logout</span>
        </button>
        {isOpen && (
          <div
            className="lg:hidden flex bg-blue-500 justify-center gap-[50px] absolute w-[75vw] h-[100vh] flex-col items-start px-12 top-[90px] left-[-20px] shadow-lg rounded-r-[30px] transition-transform ease-in-out duration-700 z-[888] text-white bg-gradient-to-b from-blue-500 to-violet-500 uppercase text-sm font-semibold "
            onClick={openNav}
          >
            {token && (
              <h3 className="text-lg rounded-lg ">
                Hi,{" "}
                <span className="text-white font-semibold capitalize">
                  {data?.username}
                </span>
              </h3>
            )}
            <a href={`/community/articles`}>Articles</a>
            <a href={`/chat/${chatid}`}>Chat</a>
            <a href="/community/stories">Stories</a>
            <button
              onClick={handleLogout}
              className="bg-white p-2 rounded-lg px-4"
            >
              <span className="text-blue-500 font-semibold">Logout</span>
            </button>
          </div>
        )}
        <div className="space-y-[5px] lg:hidden" onClick={openNav}>
          <div className="w-[25px] h-[3px] bg-white" />
          <div className="w-[25px] h-[3px] bg-white" />
          <div className="w-[25px] h-[3px] bg-white" />
        </div>
      </header>
      {article !== "udefined" || article !== null ? (
        <div className="w-full flex flex-col gap-2 lg:gap-4 pt-[100px] px-[20px] space-x-4 lg:px-[80px] space-y-2">
          <div className="space-y-2">
            <p className="text-blue-500 font-semibold pt-2 text-3xl">
              {article?.title}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              {convertDateTime(article?.time)}
            </p>
          </div>
          <div className="flex gap-2 pt-2 mt-[15px] mb-[15px]">
            <FaUser className="w-8 h-8 text-gray-500" />
            <p className="text-blue-500 ">
              by{" "}
              <span className="capitalize font-semibold text-lg">
                {article?.createdBy}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p>No article found...</p>
      )}

      {article && (
        <div className="pt-[10px] p-[20px] lg:px-20 lg:pt-[10px]">
          <div className="w-full flex flex-col lg:flex-row">
            <div className="bg-gray-400 h-[350px]">
              {loading ? (
                <p className="font-bold text-white mt-8 ml-8 text-lg">
                  Loading..
                </p>
              ) : (
                <img
                  src={article?.image}
                  alt="article-image"
                  className="object-cover rounded-lg lg:w-[400px] h-full hover:scale-105"
                />
              )}
            </div>
            <div className="gap-6 flex flex-col px-2 lg:py-0 py-6 w-full lg:w-[600px] lg:ml-[60px]">
              {/* Render HTML content using html-react-parser */}
              <div className="text-xl leading-relaxed font-sans text-gray-800">
                {description && parse ? parse(description) : description}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="shadow w-full px-4 py-2 mt-4 text-center text-gray-500 text-sm">
        <p>Zentalk {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CommunityPage;
