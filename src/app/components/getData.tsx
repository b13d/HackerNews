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

  let arr: string[] = [];

  res.data.map((value: string) => {
    arr.push(value);
  });

  let resArr: string[] = arr.sort().slice(400, 500).reverse();

  let itemsArr: IItems[] = [];

  // console.log("he");

  // console.log(itemsArr);

  return resArr.map(async (value, index) => {
    // console.log("xxx");

    let tempAxios = await axios.get<IItems>(
      `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
    );
 
    // console.log(tempAxios.data.kids);
    return (
      <div
        className="px-10 py-4 gap-5 flex flex-col rounded-tl-3xl rounded-br-3xl rounded-md bg-white"
        key={tempAxios.data.id}
      >
        <div>
          <h1>id: {tempAxios.data.id}</h1>
          <p className="w-[500px]">title: {tempAxios.data.title}</p>
          <p>score: {tempAxios.data.score}</p>
        </div>
        <div className="flex gap-1">
          <img className="w-[25px]" src="/images/chat.png" alt="chat-icon" />
          {tempAxios.data.kids !== undefined ? (
            <h2>{tempAxios.data.kids.length} comments</h2>
          ) : (
            <h2>0 comments</h2>
          )}
        </div>
      </div>
    );
  });
}
