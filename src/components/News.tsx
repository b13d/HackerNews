import { INewsItem, INumber } from "../models";
import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";


interface NewsProps {
  news: INewsItem;
}

interface NumberProps {
  number: INumber;
}

export function News(props: NewsProps) {
  console.log(props.news);
  

  return (
    <div className="wrapper">
      <div className="block-news">
        <a href="#">
          <p>{props.news.title}</p>
          <p>
            Score: <b>{props.news.score}</b>
          </p>
          <p>Author: {props.news.by}</p>
          <p>
            Date of publication:{" "}
            {moment
              .utc(props.news.time * 1000)
              .format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </a>
      </div>
    </div>
  );
}
