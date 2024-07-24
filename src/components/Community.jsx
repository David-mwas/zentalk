import React from "react";

const Community = () => {
  return (
    <div className=" p-8 rounded-lg shadow-md">
      <h2 className=" flex  justify-center items-center text-2xl font-bold mb-6 text-blue-500">
        Community
      </h2>
      <div className="mb-4  flex justify-center items-center ">
        <p className="text-slate-500 text-lg md:w-[1200px]">
          The ZenTalk community serves as a nurturing ecosystem where
          individuals come together to support, inspire, and uplift each other
          on their mental health journeys.Users can connect with like-minded
          individuals, share their experiences, and find solidarity in their
          struggles and triumphs.Through peer support, empathy, and
          encouragement, members of the ZenTalk community find strength in
          unity, knowing that they are not alone in their challenges. Together,
          they strive to break down stigmas surrounding mental health and create
          a culture of openness, understanding, and empowerment.
        </p>
      </div>

      <div className="container mx-auto mt-12">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-500 mb-4">
            Wellbeing - Unlock Inner Peace and Wellness
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-slate-500 p-4 rounded-lg text-center">
            <h2 className="font-bold text-xl text-slate-600">
              Anxiety and Depression
            </h2>
            <p className="mt-2 text-slate-500 text-lg">
              Managing anxiety and understanding depression for your wellbeing
            </p>
          </div>
          <div className="border border-slate-500 p-4 rounded-lg text-center">
            <h2 className="font-bold text-lg text-slate-600">
              Stress Management
            </h2>
            <p className="mt-2 text-slate-500 text-lg">
              Techniques for coping with stress such as mindful meditation
            </p>
          </div>
          <div className="border border-slate-500 p-4 rounded-lg text-center">
            <h2 className="font-bold text-lg text-slate-600">Relationships </h2>
            <p className="mt-2 text-slate-500 text-lg">
              Navigating conflicts effectively, healthy communication.
            </p>
          </div>
          <div className="border border-slate-500 p-4 rounded-lg text-center">
            <h2 className="font-bold text-lg text-slate-600">Grief & Loss </h2>
            <p className="mt-2 text-slate-500 text-lg">
              Self-care tips for managing grief and loss as well as seeking
              support
            </p>
          </div>
        </div>
      </div>
      <a href="/community/articles">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-l-full rounded-r-full mx-auto block mt-8 bg-gradient-to-r from-blue-500 to-violet-500">
          Explore
        </button>
      </a>
    </div>
  );
};

export default Community;
