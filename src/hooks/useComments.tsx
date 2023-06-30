import React from "react";
import axios from "axios";
import moment from "moment";

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

export default async function UseComments(currentCommentID: number) {
  const res = await axios.get<IItems>(
    `https://hacker-news.firebaseio.com/v0/item/${currentCommentID}.json?print=pretty`
  );

  let arrComment: IItems | undefined = undefined;

  arrComment = res.data;

  return arrComment;
}
