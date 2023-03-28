import axios from "axios";
import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Page = (url?: any) => {
  const [navigateTo, setNavigateTo] = useState(false);
  const [news, setNews] = useState({
    url: "",
    title: "",
    date: "",
    author: "",
    countComments: "",
    listComments: [],
  });
  const [comments, setComments] = useState<Array<Object>>([]);
  const [colors, setColors] = useState<any>([
    "#0058ff",
    "#1750bc",
    "#1c438d",
    "#193365",
  ]);

  const [positionComment, setPosComment] = useState(0);
  const navigate = useNavigate();
  let temp = window.location.href.split("/");
  let urlNumber = temp[temp.length - 1];

  console.log(news.url);

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

  const handleClickReturn = () => {
    navigate("/");
  };

  const handleClickUp = () => {
    window.scrollTo(0, 0);
  };

  async function handleClickShowMore(
    element: any,
    props: any,
    parentId: any,
    numberColor: number
  ) {
    // console.log(parentId);
    numberColor = numberColor;
    console.log(props);
    // let arr = [];
    console.log(element.currentTarget.classList.add("hidden"));

    for (const value of props) {
      let response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
      );

      console.log(value);

      console.log(response.data);

      if (response.data.deleted === true) {
        alert("Сообщение было удалено!");
        break;
      }

      const div = document.createElement("div");
      div.classList.add("comment");
      div.style.backgroundColor = colors[numberColor];
      div.style.left = positionComment + "%";
      div.classList.add("comment-kid");
      const h2 = div.appendChild(document.createElement("h2"));
      h2.textContent = response.data.by;
      const p = div.appendChild(document.createElement("p"));
      p.textContent = response.data.text;

      setPosComment((value) => {
        if (value === 50) {
          return 0;
        } else {
          return value + 5;
        }
      });

      if (numberColor < 3) numberColor++;

      if (response.data.kids !== undefined) {
        const button = div.appendChild(document.createElement("button"));

        button.addEventListener(
          "click",
          (e) => {
            handleClickShowMore(
              e,
              response.data.kids,
              response.data.id,
              numberColor
            );
          },
          false
        );

        button.classList.add("comment__show-more");
        button.textContent = "Show more";
      }

      const newDiv = div.appendChild(document.createElement("div"));
      newDiv.classList.add("comment-" + response.data.id);

      let newPlace = document.querySelector(`.comment-${parentId}`);

      if (newPlace !== null) {
        newPlace.appendChild(div);
      }
    }
  }

  async function Comments(props: number[]) {
    console.log(props);
    let arr = [];
    for (const value of props) {
      let response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
      );

      console.log(response.data);

      let temp = (
        <div className="comment" key={response.data.id}>
          <h2>{response.data.by}</h2>
          <p>{response.data.text}</p>
          {response.data.kids !== undefined ? (
            <button
              onClick={(e) =>
                handleClickShowMore(e, response.data.kids, response.data.id, 0)
              }
              className="comment__show-more"
            >
              Show more
            </button>
          ) : (
            ""
          )}
          <div className={`comment-${response.data.id}`}></div>
        </div>
      );
      arr.push(temp);
    }

    console.log(arr);
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
          <button onClick={handleClickReturn} className="personal-page__btn">
            Вернуться на главную
          </button>
        </div>
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
          {news.listComments !== undefined && news.listComments.length > 0 && comments.length === 0 ? <div><img className="gif__loading-page" src="/loading.gif" /></div> : ""}
          <>{comments}</>
        </div>
      </section>
    </>
  );
};

async function News(props: number, setNavigateTo: any, setNews: any) {
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
    console.log(news.data);
  }
}

export default Page;
