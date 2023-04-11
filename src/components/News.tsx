import {INewsItem} from "../models";
import moment from "moment";
import {Link} from "react-router-dom";
import Main from "../Main";

interface NewsProps {
    news: INewsItem;
}


export function News(props: NewsProps) {

    const handleClick = () => {
        // Main(false)
    }
    return (
        <>
            <Link onClick={() => handleClick()} to={`/pages/${props.news.id}`}>
                <div className="wrapper">
                    <div className="block-news">
                        <p>
                            {props.news.title !== undefined && props.news.title.length > 15
                                ? props.news.title.substring(0, 15) + "..."
                                : (props.news.title !== undefined ? props.news.title : "Данных нет")}
                        </p>
                        <p>
                            Score: <b>{props.news.score !== undefined ? props.news.score : "Данных нет"}</b>
                        </p>
                        <p>Author: {props.news.by !== undefined ? props.news.by : "Данных нет"}</p>
                        <p>
                            Date of publication:{" "}
                            {props.news.time !== undefined ? moment
                                .utc(props.news.time * 1000)
                                .format("MMMM Do YYYY, h:mm:ss a") : "Данных нет"}
                        </p>
                    </div>
                </div>
            </Link>
        </>
    );
}
