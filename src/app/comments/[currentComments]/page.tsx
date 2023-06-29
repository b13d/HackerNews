import React from "react";
import axios from "axios";
import moment from "moment";
import Header from "@/app/components/Header";

interface IProps {
  commentsID: number[];
}

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
}

// export default function Comments(commentsID: IProps) {
//   console.log(commentsID);

//   return;
// }

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

  // res.data.kids.map(async (value) => {
  //   const resComments = await axios.get<IComment>(
  //     `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
  //   );

  //   arrComments.push(resComments.data);
  // });

  // console.log(arrComments);

  return (
    <div className="max-w-[1000px] m-auto py-4 min-h-[100vh] px-6 bg-[#f6f6ef]">
      <Header />

      <div className="flex flex-col">
        <h1 className="text-[18px]">{res.data.title}</h1>

        <span className="flex gap-3 mb-4 text-[#777777]">
          Posted by{" "}
          <span className="font-sans">
            <span className="mr-2">{res.data.by}</span> |
            <span className="mx-2 font-mono">
              {moment.unix(res.data.time).fromNow()} |
            </span>
            {res.data.kids !== undefined ? res.data.kids.length : 0} comments
          </span>
        </span>
        <section className="flex flex-col gap-3">
          {res.data.kids !== undefined ? (
            res.data.kids.map(async (value) => {
              const resComments = await axios.get<IComment>(
                `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
              );

              console.log(resComments);
              // JSON.parse(resComments.data.text);
              console.log(resComments.data.text);
              // arrComments.push(resComments.data);

              console.log(resComments.data.text);

              return (
                <div key={resComments.data.id}>
                  <p className="text-[gray]">
                    {resComments.data.by}{" "}
                    {moment.unix(resComments.data.time).fromNow()}
                  </p>
                  <h1>
                    {resComments.data.text === "[dead]" ? (
                      <span className="text-red-400">Comment deleted</span>
                    ) : (
                      resComments.data.text
                        .replace(new RegExp("&" + "#" + "x27;", "g"), "'")
                        .replace(new RegExp("&#x2F;", "g"), "/")
                        .replace(new RegExp("<p>", "g"), "")
                        .replace(new RegExp("</p>", "g"), "")
                        .replace(new RegExp("<a>", "g"), "")
                        .replace(new RegExp("</a>", "g"), "")
                    )}
                  </h1>
                </div>
              );
            })
          ) : (
            <span className="m-auto">There are no comments</span>
          )}
        </section>
      </div>
    </div>
  );
}
