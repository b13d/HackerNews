"use client";

import React from "react";
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
  // console.log(params.currentComments);
  //

  let arrComments: IComment[] = [];

  const res = await axios.get<IItems>(
    `https://hacker-news.firebaseio.com/v0/item/${params.currentComments}.json?print=pretty`
  );

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
                  {resComments.data.kids !== undefined &&
                  resComments.data.kids.length > 0 ? (
                    <span
                      onClick={() => UseComments(resComments.data.kids)}
                      className="hover:underline cursor-pointer ml-1"
                    >
                      [{resComments.data.kids.length} more]
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <>
                  {resComments.data.text === "[dead]" ||
                  resComments.data.text === "undefined" ||
                  resComments.data.deleted === true ? (
                    <span className="text-red-400">Comment deleted</span>
                  ) : (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<div className=${`${resComments.data.id} leading-5`}>${
                            resComments.data.text
                          }</div>`,
                        }}
                      ></div>
                    </>
                  )}
                </>
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
