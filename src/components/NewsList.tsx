import React, {useEffect, useState} from "react";
import "../App.css";
import axios from "axios";
import {News} from "./News";
import {INewsItem} from "../models";
import {useLocation} from "react-router";
import {ScrollRestoration} from "react-router-dom";

export default function NewsList() {
    const [numberNews, setNumberNews] = useState([]);
    const [newsItems, setNewsItems] = useState<INewsItem[]>();

    let location = useLocation();

    useEffect(() => {
    }, [location])

    async function NumberNewsData() {
        await axios
            .get(
                "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty?"
            )
            .then((res) => {
                setNumberNews(res.data);
            });
    }

    async function UsersData() {
        // перезагрузка данных или же обновление
        const responseItems = await axios.get(
            `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`
        );

        let arr: INewsItem[] = [];

        await responseItems.data.map((value: number, index: number) => {
            if (index < 150) CreateItems(value, arr, index);
        });
    }

    async function CreateItems(value: number, arr: INewsItem[], index: number) {
        const res = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
        );
        if (res.data !== null) arr.push(res.data);

        if (arr.length === 100) {
            let wasChange = true;
            let counter = 0;

            // console.log(arr);

            let newArr = Array.from(arr);

            // console.log(newArr);

            while (wasChange) {
                counter = 0;
                for (let i = 0; i < newArr.length; i++) {
                    // console.log(newArr[i].time);

                    if (
                        newArr[i + 1] !== undefined &&
                        newArr[i].time < newArr[i + 1].time
                    ) {
                        let temp = newArr[i];
                        newArr[i] = newArr[i + 1];
                        newArr[i + 1] = temp;
                        counter++;
                        i++;
                    }
                }
                // console.log(counter);
                if (counter === 0) {
                    setNewsItems(newArr);
                    wasChange = false;
                }
            }
        }
    }

    useEffect(() => {
        NumberNewsData();
    }, []);

    useEffect(() => {
        // вычисление даты по публикации по времени
        UsersData();
        setInterval(() => UsersData(), 60000);
    }, []);

    // console.log(newsItems);

    const handleClickBtnUp = () => {
        window.scroll(0, 0);
    };

    const handleClickBtn = () => {
        setNewsItems(undefined);
        UsersData();
    };

    console.log(location)

    return (
        <>
            {numberNews.length < 1 || newsItems === undefined ? (
                <div className="gif-block">
                    <img className="gif-loading" src="/loading.gif"/>
                </div>
            ) : (
                ""
            )}

            <div className="Main">
                {newsItems !== undefined ? (
                    <>
                        <button onClick={handleClickBtn} className="btn-main">
                            Обновить таблицу
                        </button>
                        <button onClick={handleClickBtnUp} className="btn-toUp">
                            Наверх
                        </button>
                    </>
                ) : (
                    ""
                )}

                {/*{newsItems !== undefined && window.location.href === "http://localhost:3000/"*/}
                {/*    ? newsItems.map((news) => <News news={news} key={news.id}/>)*/}
                {/*    : ""}*/}
                {newsItems !== undefined && location.pathname === "/" ? newsItems.map((news) => <News news={news} key={news.id}/>) : ""}
                <ScrollRestoration />
            </div>
        </>
    );
}