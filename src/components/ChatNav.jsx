import useAuthToken from "../../hooks/useAuth";
import image from "../assets/images/zen2.png";
import { useState } from "react";
function ChatNav({ name }) {
  const { clearAuthToken } = useAuthToken();
  const [isOpen, setIsOpen] = useState(false);
  const openNav = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    clearAuthToken();
    window.location.href = "/chatlogin";
  };
  return (
    <header className="w-screen flex justify-between items-center gap-2 px-4 md:px-20 py-4 fixed z-[999] h-[80px] shadow-lg bg-gradient-to-r from-blue-500 to-violet-500">
      <div className="flex items-center">
        <a href="/">
        <img src={image} alt="Logo" className="mr-8" width={200} height={0} />
          {/* <h1 className="text-white font-bold text-3xl">ZenTalk</h1> */}
        </a>
        
      </div>
      <nav className="hidden md:flex justify-between items-center gap-4 md:gap-20 capitalize text-white">
        <h3 className="text-lg p-2 rounded-lg px-4">
          Hi, <span className="text-white font-bold">{name}</span>
        </h3>
        <a href="/community/articles">articles</a>
        {/* <a href="/history">history</a> */}

        <button onClick={handleLogout} className="bg-white p-2 rounded-lg px-4">
          <span className="text-blue-500 font-semibold">Logout</span>
        </button>
      </nav>
      {isOpen && (
        <div
          className="md:hidden flex bg-blue-500 bg-gradient-to-b from-blue-500 to-violet-500 justify-center gap-[50px] font-semibold absolute w-[75vw] h-[100vh] flex-col items-start px-12 top-[90px] left-[-20px] shadow-md rounded-r-[30px] transition-transform ease-in-out duration-700 z-[888] text-white"
          onClick={openNav}
        >
          {/* <a href="/history">history</a> */}
          <h3 className="text-lg  rounded-lg ">
            Hi, <span className="text-white font-bold capitalize">{name}</span>
          </h3>
          <a href="/community/articles">articles</a>
          <button
            onClick={handleLogout}
            className="bg-white p-2 rounded-lg px-4"
          >
            <span className="text-blue-500 font-semibold">Logout</span>
          </button>{" "}
        </div>
      )}
      <div className="space-y-[5px] md:hidden" onClick={openNav}>
        <div className="w-[25px] h-[3px] bg-white" />
        <div className="w-[25px] h-[3px] bg-white" />
        <div className="w-[25px] h-[3px] bg-white" />
      </div>
    </header>
  );
}

export default ChatNav;
