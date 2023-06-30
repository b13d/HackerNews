import React from "react";
import axios from "axios";
import moment from "moment";

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

export default function UseComments(
  currentCommentID: number,
  commentsID: number[]
) {
  console.log(currentCommentID);
  console.log(commentsID);

  let tempArr: IComment[] = [];

  let q = document.getElementById(currentCommentID.toString());

  let div = document.createElement("div");
  let span = document.createElement("span");

  // span.onclick = onClick={() =>
  //   UseComments(resComments.data.id, resComments.data.kids)
  // }

  let qq = commentsID.map(async (value) => {
    const resComments = await axios.get<IComment>(
      `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
    );

    return (div.innerHTML = `<p class="text-[gray]">${
      resComments.data.by
    } ${moment.unix(resComments.data.time).fromNow()} <span>${
      resComments.data.kids !== undefined &&
      resComments.data.kids.length > 0 ? (
        <span
          onClick={() =>
            UseComments(resComments.data.id, resComments.data.kids)
          }
        >
          click
        </span>
      ) : (
        // <span
        // onClick={() =>
        //   UseComments(resComments.data.id, resComments.data.kids)
        // }
        //   className="hover:underline cursor-pointer ml-1"
        // >
        //   {resComments.data.kids.length} more
        // </span>
        ""
      )
    }</span></p>`);
  });

  q?.appendChild(div);

  // console.log(qq)

  // if (q !== undefined) {
  //   q?.appendChild(qq.map);
  // }
  // console.log(q);
  // return commentsID.map(async (value) => {
  //   const res = await axios.get<IComment>(
  //     `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
  //   );

  //   tempArr.push(res.data);

  //   return <div key={res.data.id}>{res.data.text}</div>;
  // });

  // return commentsID.map((value, index) => {
  //   const res = axios.get<IComment>(
  //     `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
  //   );

  //   // tempArr.push(res.data);

  //   return <div key={index}>hello</div>;
  //   // return <div key={res.data.id}>{res.data.text}</div>;
  // });

  return <h1>hello</h1>;
}
