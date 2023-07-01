"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Header from "@/app/components/Header";
import Link from "next/link";
import UseComments from "@/hooks/useComments";
import { Comment } from "@/app/components/Comment";

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

  const handleTest = () => {
    console.log("test!!!");
  };

  const handleClickKids = (
    element: HTMLSpanElement,
    kids: number[],
    currentID: number
  ) => {
    // let tempClass = document.querySelectorAll(`.hidden-${currentID}`);

    console.log(element);
    console.log(currentID);

    let arrTemp: HTMLElement[] = [];

    // debugger;
    let childrenElement = element.parentElement?.parentElement?.querySelector(
      ".children"
    ) as HTMLElement;

    console.log(childrenElement);

    if (element.classList.contains("hide")) {
      element.classList.remove("hide");
      element.classList.add("show");
      element.innerHTML = "[hide]";

      kids.map(async (value) => {
        const res = await axios.get<IComment>(
          `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
        );

        let div = document.createElement("div");
        div.className = `children-${res.data.id} ml-5 my-2`;
        let p = document.createElement("p");
        p.className = "text-[gray] max-sm:text-[14px]";
        p.innerText = res.data.by + " " + moment.unix(res.data.time).fromNow();
        let span = document.createElement("span");
        span.className = "hover:underline cursor-pointer ml-1 hide";
        span.innerHTML =
          res.data.kids !== undefined && res.data.kids.length > 0
            ? `[${res.data.kids.length} more]`
            : "";
        span.onclick = (e) => handleClickKids(span, res.data.kids, res.data.id);
        p.appendChild(span);
        let divInner = document.createElement("div");
        divInner.className = "leading-5 max-sm:text-[13px]";
        divInner.innerHTML = res.data.text;
        div.appendChild(p);
        div.appendChild(divInner);
        let divChildren = document.createElement("div");
        divChildren.classList.add("children");
        div.appendChild(divChildren);
        childrenElement.appendChild(div);
      });
    } else {
      element.classList.add("hide");
      element.classList.remove("show");

      element.innerHTML = `${kids.length} more`;
      childrenElement.innerHTML = "";
    }

    console.log(arrTemp);
  };

  return (
    <div className="max-w-[1000px] m-auto py-4 min-h-[100vh] px-2 sm:px-6 bg-[#f6f6ef] drop-shadow-2xl overflow-hidden">
      <Header />

      <div className="flex flex-col gap-2">
        <div className="mt-10">
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
              <div id={`${resComments.data.id}`} key={resComments.data.id}>
                <p className="text-[gray] max-sm:text-[14px]">
                  {resComments.data.by}{" "}
                  {moment.unix(resComments.data.time).fromNow()}
                  <span
                    onClick={(e) =>
                      handleClickKids(
                        e.currentTarget,
                        resComments.data.kids,
                        resComments.data.id
                      )
                    }
                    className="hover:underline cursor-pointer ml-1 hide"
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
                        dangerouslySetInnerHTML={{
                          __html: `<div class="leading-5 max-sm:text-[13px]">${resComments.data.text}</div>`,
                        }}
                      ></div>
                    </>
                  )}
                </>
                <div className="children"></div>
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
