import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import moment from "moment";

const Page = (url?: any) => {
    const [navigateTo, setNavigateTo] = useState<Boolean>(false);
    const [news, setNews] = useState({
        url: "",
        title: "",
        date: "",
        author: "",
        countComments: "",
        listComments: [],
    });
    const [comments, setComments] = useState<Array<Object>>([]);


    const navigate = useNavigate();
    let temp = window.location.href.split("/");
    let urlNumber = temp[temp.length - 1];

    if (news.url === "") News(Number(urlNumber), setNavigateTo, setNews);

    useEffect(() => {
        setNavigateTo((value) => {
            if (value === false) return value;
            else {
                navigate("*");
                return true;
            }
        });
    }, [navigateTo]);

    const handleClickUpdate = () => {
        setNews({
            url: "",
            title: "",
            date: "",
            author: "",
            countComments: "",
            listComments: [],
        });
    };

    const handleClickUp = () => {
        window.scrollTo(0, 0);
    };

    async function handleClickShowMore(
        element: any,
        props: any,
        parentId: any,
    ) {

        element.currentTarget.classList.add("hidden");

        for (const value of props) {
            let response = await axios.get(
                `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
            );


            if (response.data.deleted === true) {
                alert("Сообщение было удалено!");
                break;
            }

            const div = document.createElement("div");
            div.classList.add("comment");
            div.classList.add("comment-kid");
            const h2 = div.appendChild(document.createElement("h2"));
            h2.textContent = response.data.by;
            h2.classList.add("comment__by");
            const p = div.appendChild(document.createElement("p"));
            p.textContent = response.data.text;


            const newDiv = div.appendChild(document.createElement("div"));
            newDiv.classList.add("comment-" + response.data.id);
            newDiv.style.paddingLeft = "10px"

            if (response.data.kids !== undefined) {
                const button = div.appendChild(document.createElement("button"));

                button.addEventListener(
                    "click",
                    (e) => {
                        handleClickShowMore(
                            e,
                            response.data.kids,
                            response.data.id,
                        );
                    },
                    false
                );

                button.classList.add("comment__show-more");
                button.textContent = "Show more";
            }

            let newPlace = document.querySelector(`.comment-${parentId}`);

            if (newPlace !== null) {
                newPlace.appendChild(div);
            }
        }
    }

    async function Comments(props: number[]) {
        // console.log(props);
        let arr = [];
        for (const value of props) {
            let response = await axios.get(
                `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
            );

            // console.log(response.data);

            let temp = (
                <div className="comment" key={response.data.id}>
                    <h2 className="comment__by">{response.data.by}</h2>
                    <p>{response.data.text}</p>
                    {response.data.kids !== undefined ? (
                        <button
                            onClick={(e) =>
                                handleClickShowMore(e, response.data.kids, response.data.id)
                            }
                            className="comment__show-more"
                        >
                            Show more
                        </button>
                    ) : (
                        ""
                    )}
                    <div style={{paddingLeft: "10px"}} className={`comment-${response.data.id}`}></div>
                </div>
            );
            arr.push(temp);
        }

        // console.log(arr);
        setComments(Array.from(arr));
    }

    useEffect(() => {
        if (news.listComments !== undefined && news.listComments.length > 0)
            Comments(news.listComments);
    }, [news]);

    return (
        <>
            <section className="personal-page">
                <button onClick={handleClickUp} className="btn-toUp">
                    Наверх
                </button>
                <div className="personal-page__buttons">
                    <button onClick={handleClickUpdate} className="personal-page__btn">
                        Обновить комментарии
                    </button>
                    <Link to="/">
                        <button className="personal-page__btn">Вернуться на главную</button>
                    </Link>
                </div>
                {news.url === "" ? (
                    <div>
                        <img className="gif__loading-page" src="/loading.gif"/>
                    </div>
                ) : (
                    <div className="only-news">
                        <p>
                            url:{" "}
                            <a target="_blank" href={news.url}>
                                {news.url}
                            </a>
                        </p>

                        <p>title: {news.title}</p>
                        <p>
                            date:
                            {moment
                                .utc(Number(news.date) * 1000)
                                .format("MMMM Do YYYY, h:mm:ss a")}
                        </p>
                        <p>author: {news.author}</p>
                        <p>countComments: {news.countComments}</p>
                        {news.listComments !== undefined &&
                        news.listComments.length > 0 &&
                        comments.length === 0 ? (
                            <div className="gif__block">
                                <img className="gif__loading-page" src="/loading.gif"/>
                            </div>
                        ) : (
                            ""
                        )}
                        <>{comments}</>
                    </div>
                )}
            </section>
        </>
    );
};

async function News(props: number, setNavigateTo: React.Dispatch<React.SetStateAction<Boolean>>, setNews: any) {
    let news = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${props}.json?print=pretty`
    );

    if (news.data === null) {
        setNavigateTo(true);
    } else {
        setNews({
            url: news.data.url,
            title: news.data.title,
            date: news.data.time,
            author: news.data.by,
            countComments: news.data.descendants,
            listComments: news.data.kids,
        });
        // console.log(news.data);
    }
}

export default Page;
