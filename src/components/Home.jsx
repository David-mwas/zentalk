import HomeNav from "./HomeNav";
import LandingPage from "./LandingPage";
import Footer from "./Footer";

import Community from "./Community";

const Home = () => {
  return (
    <div className="flex flex-col space-y-8">
      <HomeNav />
      <LandingPage />
      <div className="bg-[#6495ED43] w-full flex flex-col justify-center items-center mt-12 p-4">
        <section
          id="about"
          className="w-full flex-col justify-center items-center text-center  md:w-[1200px] p-8;
]"
        >
          <h2 className="text-2xl mb-6 font-bold text-blue-500 ">
            About ZenTalk
          </h2>
          <p className="w-full text-left text-slate-500 text-lg">
            {`In today\'s interconnected world you can be surrounded by people,
              but still feel lonely and trusting others with our vulnerabilities
              is still hard.`}
          </p>
          <p className="text-left mt-2 text-slate-500 text-lg">
            <span className="text-blue-600 font-bold">ZenTalk</span> is an
            empathetic entanglement chatbot that serves as a confidant,
            providing a safe space for users to openly express their thoughts
            and emotions and extends a comforting hand helping you prioritize
            your mental health and well-being in a non-judgemental way.
          </p>
        </section>
      </div>
      <Community />
      <Footer />
    </div>
  );
};

export default Home;
