import axios from "axios";

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

export default async function getData() {
  const res = await axios.get(
    // "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
  );

  // console.log(res.data);

  let q = res.headers["Content-Length"];

  let arr: string[] = [];
  // console.log(arrNews);

  res.data.map((value: string) => {
    // console.log(value);
    arr.push(value);
  });

  let resArr: string[] = arr.sort().slice(400, 500);

  let itemsArr: IItems[] = [];

  resArr.map(async (value, index) => {
    console.log("xxx");

    let tempAxios = await axios.get<IItems>(
      `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
    );

    itemsArr.push(tempAxios.data);
  });

  console.log();

  console.log("he");

  console.log(itemsArr);

  return itemsArr.map((value) => {
    return (
      <div key={value.id}>
        <h1>id: {value.id}</h1>
        <h1>title: {value.title}</h1>
      </div>
    );
  });

  // arr.map((value, index) => {
  //   console.log(value);
  //   idArr.push(value);
  //   return <p key={index}>{value}</p>;
  // });

  // console.log(idArr.length);
  // return res.json();
}
