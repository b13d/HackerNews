import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { News } from "./components/News";
import { INewsItem } from "../src/models";

function App() {
  const [numberNews, setNumberNews] = useState([]);
  // const [newsItems, setNewsItems] = useState<INewsItem[]>();
  const [newsItems, setNewsItems] = useState<INewsItem[]>();

  async function NumberNewsData() {
    await axios
      .get(
        "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty?"
      )
      .then((res) => {
        // console.log(res.data)

        setNumberNews(res.data);
      });
  }

  async function UsersData() {
    console.log("ADSADSAASD");

    const responseItems = await axios.get(
      `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`
    );

    let arr:INewsItem[] = [];
    // let arr:Array<Object> = [];

    responseItems.data.map((value: number, index: number) => {
      if (index < 100) Test(value, arr)  
    });


    // console.log(arr);
  }

  async function Test(value:number, arr:INewsItem[]) {
    // console.log(value)
    const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`)
    arr.push(res.data)

    if (arr.length === 100) {
      setNewsItems(arr);
    }
  }

  useEffect(() => {
    NumberNewsData();
  }, []);

  useEffect(() => {
    // вычисление даты по публикации по времени
    UsersData();
  }, [numberNews]);

  console.log(newsItems);

  return (
    <div className="App">
      {numberNews.length < 1 || newsItems === undefined ? <img className="gif-loading" src="/loading.gif" /> : ""}
      {newsItems !== undefined
        ? newsItems.map((news) => <News news={news} key={news.id} />)
        : ""}
    </div>
  );
}

export default App;
