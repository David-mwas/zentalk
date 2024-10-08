import React from "react";

import { FaUser } from "react-icons/fa";
import { convertDateTime } from "../../hooks/useDateTime";
function SingleArticle({ article }) {
  console.log(article);
  return (
    <article className="bg-white rounded-lg w-full shadow-sm shadow-black hover:scale-105 ">
      <div className="bg-gray-300 h-[200px]">
        <img
          src={article?.image}
          alt="image"
          className="object-cover rounded-lg w-full h-full"
        />
      </div>
      <div className="w-full px-2 flex justify-between gap-2">
        <div className="flex gap-2 pt-2">
          <FaUser className="w-8 h-8 text-gray-500" />
          <p className="text-blue-500 ">
            by{" "}
            <span className="capitalize font-semibold text-lg">
              {article?.createdBy}
            </span>
          </p>
        </div>
        <div>
          <p className="text-blue-500 font-semibold pt-2 capitalize text-2xl">
            {article?.title}
          </p>
          <p className="text-sm font-semibold m-2">
            {convertDateTime(article?.time)}
          </p>
        </div>
      </div>
      <div className="px-2 py-2">
        <p>
          {article?.description?.slice(0, 200)}...{" "}
          <span className="text-blue-500 font-semibold">
            <a href={`/community/articles/${article?._id}`}>Read more</a>
          </span>
        </p>
      </div>
    </article>
  );
}

export default SingleArticle;
