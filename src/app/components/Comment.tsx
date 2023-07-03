import React from "react";
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

export function Comment(
  newComment: IComment,
  handleClickKids: (
    element: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    kids: number[],
    currentID: number
  ) => void
) {
  return (

    <div id={`${newComment.id}`} key={newComment.id}>
      <p className="text-[gray]">
        {newComment.by} {moment.unix(newComment.time).fromNow()}
        <span
          onClick={(e) => handleClickKids(e, newComment.kids, newComment.id)}
          className="hover:underline cursor-pointer ml-1"
        >
          {newComment.kids !== undefined
            ? "[" + newComment.kids.length + " more]"
            : ""}
        </span>
      </p>

      <>
        {newComment.text === "[dead]" ||
        newComment.text === "undefined" ||
        newComment.deleted === true ? (
          <span className="text-red-400">Comment deleted</span>
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: `<div  className=${`leading-5`}>${
                  newComment.text
                }</div>`,
              }}
            ></div>
          </>
        )}
      </>
      <div className="children ml-5"></div>
    </div>
  );
}
