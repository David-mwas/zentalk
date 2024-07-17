import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <section
      id="contact"
      className="w-screen sticky bg-[#6495ED47]  p-6 gap-4 grid grid-cols-1 md:grid-cols-3 bg-gradient-to-r from-blue-500 to-violet-500"
    >
      <div>
        <h3 className="font-bold text-lg">Contacts</h3>
        <p className="text-gray-300">Phone No: +254795209160</p>
        <p className="text-gray-300">Email :zentalk@gmail.com</p>
      </div>
      <div>
        <h3 className="font-bold text-lg md:text-center">Social links</h3>
        <div className="flex md:justify-center items-center text-gray-300 md:flex-col gap-4 flex-row p-4 transition-all duration-75 ease-in-out">
          <a href="">
            <FaInstagram className="w-8 h-8 hover:scale-105 hover:text-white" />
          </a>
          <a href="">
            <FaTwitter className="w-8 h-8 hover:scale-105 hover:text-white" />
          </a>

          <a href="">
            <FaFacebook className="w-8 h-8 hover:scale-105 hover:text-white" />
          </a>
        </div>
      </div>
      <div className="w-full">
        <h3 className="font-bold text-lg mb-2">Leave a message here</h3>
        <form action="#" className=" grid gap-2 w-full">
          <div className="flex gap-4 mb-4 w-full">
            <input
              type="text"
              className="py-2 rounded-lg outline-none px-2 w-full "
              placeholder="Name"
              required={true}
            />
            <input
              type="email"
              className="py-2 rounded-lg outline-none px-2 w-full"
              required={true}
              placeholder="e.g email@gmail.com"
            />
          </div>
          <textarea
            name=""
            id=""
            className="w-full col-span-2  h-[80px] resize-none outline-none px-2 rounded-lg py-2"
            required={true}
            placeholder="message here..."
          ></textarea>
          <button className=" font-semibold text-white py-2 bg-blue-400 rounded-lg w-[250px] hover:rounded-xl hover:bg-blue-300 hover:px-4 mt-4">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Footer;
