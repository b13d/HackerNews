"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Header from "@/app/components/Header";
import Link from "next/link";
import UseComments from "@/hooks/useComments";

interface IItems {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

interface IComment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
  deleted?: boolean;
}

export default async function Comments({
  params,
}: {
  params: { currentComments: number };
}) {
  // const [currentURL, setCurrentURL] = useState("");
  const res = await axios.get<IItems>(
    `https://hacker-news.firebaseio.com/v0/item/${params.currentComments}.json?print=pretty`
  );

  const handleClickKids = (
    element: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    kids: number[],
    currentID: number
  ) => {
    let q = document.querySelectorAll(`.hidden-${currentID}`);

    console.log(currentID);

    if (q[0].classList.contains("hidden")) {
      element.currentTarget.innerHTML = "[hide]";

      q.forEach((value) => {
        value.classList.remove("hidden");
      });
    } else {
      element.currentTarget.innerHTML = "[" + kids.length + " more]";

      q.forEach((value) => {
        value.classList.add("hidden");
      });
    }

    console.log(q);
  };

  return (
    <div className="max-w-[1000px] m-auto py-4 min-h-[100vh] px-6 bg-[#f6f6ef]">
      <Header />

      <div className="flex flex-col gap-5">
        <div className="mt-10 mb-5">
          <h1 className="text-[18px]">{res.data.title}</h1>

          <span className="flex gap-3 mb-4 text-[#777777]">
            Posted by{" "}
            <span className="font-sans">
              <span className="mr-2">{res.data.by}</span> |
              <span className="mx-2 font-mono">
                {moment.unix(res.data.time).fromNow()} |
              </span>
              {res.data.descendants !== undefined ? res.data.descendants : 0}{" "}
              comments
            </span>
          </span>
        </div>

        {res.data.kids !== undefined ? (
          res.data.kids.map(async (value) => {
            const resComments = await axios.get<IComment>(
              `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
            );

            return (
              <div key={resComments.data.id}>
                <p className="text-[gray]">
                  {resComments.data.by}{" "}
                  {moment.unix(resComments.data.time).fromNow()}
                  <span
                    onClick={(e) =>
                      handleClickKids(
                        e,
                        resComments.data.kids,
                        resComments.data.id
                      )
                    }
                    className="hover:underline cursor-pointer ml-1"
                  >
                    {resComments.data.kids !== undefined
                      ? "[" + resComments.data.kids.length + " more]"
                      : ""}
                  </span>
                </p>

                <>
                  {resComments.data.text === "[dead]" ||
                  resComments.data.text === "undefined" ||
                  resComments.data.deleted === true ? (
                    <span className="text-red-400">Comment deleted</span>
                  ) : (
                    <>
                      <div
                        id={resComments.data.id.toString()}
                        dangerouslySetInnerHTML={{
                          __html: `<div  className=${`leading-5`}>${
                            resComments.data.text
                          }</div>`,
                        }}
                      ></div>
                    </>
                  )}
                </>
                {resComments.data.kids !== undefined &&
                  resComments.data.kids.length > 0 && (
                    <>
                      {resComments.data.kids.map(async (value) => {
                        const innerResComments = await axios.get<IComment>(
                          `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
                        );

                        return (
                          <div
                            className={`hidden-${resComments.data.id} hidden ml-10 mt-2`}
                            key={innerResComments.data.id}
                          >
                            <p className="text-[gray]">
                              {innerResComments.data.by}{" "}
                              {moment
                                .unix(innerResComments.data.time)
                                .fromNow()}
                            </p>
                            <>
                              {innerResComments.data.text === "[dead]" ||
                              innerResComments.data.text === "undefined" ||
                              innerResComments.data.deleted === true ? (
                                <span className="text-red-400">
                                  Comment deleted
                                </span>
                              ) : (
                                <>
                                  <div
                                    id={innerResComments.data.id.toString()}
                                    dangerouslySetInnerHTML={{
                                      __html: `<div  className=${`leading-5`}>${
                                        innerResComments.data.text
                                      }</div>`,
                                    }}
                                  ></div>
                                </>
                              )}
                            </>
                          </div>
                        );
                      })}
                    </>
                  )}
              </div>
            );
          })
        ) : (
          <span className="m-auto">
            There are no comments{" "}
            <Link className=" underline" href="/">
              back
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
