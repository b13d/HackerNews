import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { News } from "./components/News";
import { INewsItem } from "../src/models";

function Main() {
  const [numberNews, setNumberNews] = useState([]);
  // const [newsItems, setNewsItems] = useState<INewsItem[]>();
  const [newsItems, setNewsItems] = useState<INewsItem[]>();

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
      if (index < 100) CreateItems(value, arr);
    });
  }

  async function CreateItems(value: number, arr: INewsItem[]) {
    const res = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
    );
    arr.push(res.data);

    if (arr.length === 100) {
      let wasChange = true;
      let counter = 0;
      let newArr = Array.from(arr);

      while (wasChange) {
        counter = 0;
        // console.log(newArr[0].time);
        for (let i = 0; i < newArr.length; i++) {
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
    window.scroll(0,0);
  }

  const handleClickBtn = () => {
    setNewsItems(undefined);
    UsersData();
  };

  return (
    <>
      {numberNews.length < 1 || newsItems === undefined ? (
        <div className="gif-block">
          <img className="gif-loading" src="/loading.gif" />
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
        {newsItems !== undefined
          ? newsItems.map((news) => <News news={news} key={news.id} />)
          : ""}
      </div>
    </>
  );
}

export default Main;
