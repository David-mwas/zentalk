import Donut from "./Donut";
import image from "../assets/images/Smart_Ai_Chatbots-removebg-preview.png";
import useAuthToken from "../../hooks/useAuth";
function LandingPage() {
  const { getItem } = useAuthToken();
  const { chatid } = getItem();

  return (
    <div className="w-screen h-screen flex-col  md:flex-row flex justify-center items-center overflow-x-hidden pt-4 px-4">
      <div className="relative w-full h-[300px] flex  justify-between items-center flex-col  pt-2 md:flex-row md:px-8">
        <div className="w-full flex flex-col items-center justify-center md:items-start mt-[-50px] md:mt-0">
          <h1 className="text-2xl  font-[500] text-slate-500 w-full text-center md:text-start mb-6">
            Welcome to{" "}
            <span className="text-4xl md:text-6xl font-[monospace] text-indigo-500">
              ZenTalk
            </span>
          </h1>
          <h2 className="text-3xl text-slate-500 w-full text-center md:text-start">
            {" "}
            Your Compassionate Companion
          </h2>
          <p
            className="mb-8 mt-2
            text-slate-500 
           text-center md:text-start
        "
          >
            Be gentle and kind to your Mind
          </p>
          <a href={`/chat/${chatid}`} className="md:mt-[40px] mt-[20px]">
            <button className="px-[120px] py-4 bg-blue-500 rounded-full text-white font-semibold hover:bg-blue-400 hover:px-[140px] w-full text-center">
              Get Started
            </button>
          </a>
        </div>
        <div className="z-[-1]">
          <div
            className="w-full flex-col justify-center items-center text-center  md:w-[530px] z-[-1];
]"
          >
            <div className="md:flex h-[400px] rounded-2xl z-[-1] mt-[60px] ">
              <img
                src={image}
                alt="virtualAssistant img"
                width={400}
                height={400}
                className="object-cover  object-top rounded-2xl z-[-1]"
              />
            </div>
            {/* <h2 className="text-2xl mb-2">About InnerGlow</h2>
            <p className="w-full text-left text-gray-700">
              {`In today\'s interconnected world you can be surrounded by people,
              but still feel lonely and trusting others with our vulnerabilities
              is still hard.`}
            </p>
            <p className="text-left mt-2 text-gray-700">
              <span className="text-blue-600 font-bold">InnerGlow</span> is an
              empathetic chatbot that serves as a confidant, providing a safe
              space for users to openly express their thoughts and emotions and
              extends a comforting hand helping you prioritize your mental
              health and well-being in a non-judgemental way.
            </p> */}
          </div>
        </div>
        {/* <div className="absolute left-[-120px] top-[-260px] z-[-1] md:top-[-330px] md:left-[-140px]">
          <Donut />
        </div>
        <div className="absolute right-[-130px] bottom-[-320px] z-[-1] md:bottom-[-360px]">
          <Donut />
        </div> */}
      </div>
    </div>
  );
}

export default LandingPage;
