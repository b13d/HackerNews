import { INewsItem } from "../models";
import moment from "moment";
import { Link } from "react-router-dom";

interface NewsProps {
  news: INewsItem;
}


export function News(props: NewsProps) {
  // console.log(props.news);

  return (
    <>
      <Link to={`/pages/${props.news.id}`}>
        <div className="wrapper">
          <div className="block-news">
            <p>
              {props.news.title.length > 15
                ? props.news.title.substring(0, 15) + "..."
                : props.news.title}
            </p>
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
          </div>
        </div>
      </Link>
    </>
  );
}
