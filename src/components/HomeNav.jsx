import { useState } from "react";
import useAuthToken from "../../hooks/useAuth";
import image from "../assets/images/zen2.png";
const HomeNavbar = () => {
  const { getItem } = useAuthToken();
  const { chatid } = getItem();
  const [isOpen, setIsOpen] = useState(false);
  const openNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-blue-500  p-4 fixed w-screen z-[999] h-[80px] flex items-center justify-between bg-gradient-to-r from-blue-500 to-violet-500">
      <div className="container mx-auto flex items-center justify-between w-full relative">
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

        <div className="flex-1 md:flex items-center space-x-4   justify-center bg-red- gap-[100px] mr-[-150px] font-semibold hidden">
          <a href="#about" className="text-white hover:text-gray-200">
            About
          </a>
          <a
            href="/community/articles"
            className="text-white hover:text-gray-200"
          >
            Community
          </a>
          <a href="#contact" className="text-white hover:text-gray-200">
            Contact
          </a>
        </div>
        {isOpen && (
          <div
            className="md:hidden flex bg-blue-500 justify-center gap-[50px] font-semibold absolute w-[75vw] h-[100vh] flex-col items-start px-12 top-[90px] left-[-20px] shadow-md rounded-r-[30px] transition-transform ease-in-out duration-700 z-[888] bg-gradient-to-b from-blue-500 to-violet-500"
            onClick={openNav}
          >
            <a href="#about" className="text-white hover:text-gray-200">
              About
            </a>
            <a
              href="/community/articles"
              className="text-white hover:text-gray-200"
            >
              Community
            </a>
            <a href="#contact" className="text-white hover:text-gray-200">
              Contact
            </a>
          </div>
        )}
        <div className="space-y-[5px] md:hidden" onClick={openNav}>
          <div className="w-[25px] h-[3px] bg-white" />
          <div className="w-[25px] h-[3px] bg-white" />
          <div className="w-[25px] h-[3px] bg-white" />
        </div>
        <div className="ml-auto hidden sm:block">
          <a
            href={`/chat/${chatid}`}
            className="bg-white text-blue-500 hover:bg-blue-300 py-2 px-4 rounded-l-full rounded-r-full font-semibold"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
