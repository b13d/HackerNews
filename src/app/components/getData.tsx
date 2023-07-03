import Link from "next/link";
import moment from "moment";

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
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
    { next: { revalidate: 10 } }
  )
    .then((response) => {
      return response.json();
    })
    .then((data: number[]) => {
      return data;
    });

  let arr: string[] = [];

  res.map((value: number) => {
    arr.push(value.toString());
  });

  let resArr: string[] = arr.sort().slice(400, 500).reverse();

  return resArr.map(async (value, index) => {
    let tempAxios = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`
    )
      .then((response) => {
        return response.json();
      })
      .then((data: IItems) => {
        return data;
      });

    return (
      <div
        className="overflow-hidden max-[500px]:w-full max-[500px]:justify-start sm:px-5 sm:py-4 sm:gap-5 px-1 py-3 gap-2 min-h-[120px] flex items-center justify-center rounded-tl-3xl rounded-br-3xl rounded-md bg-white"
        key={tempAxios.id}
      >
        <div className="flex flex-col items-center justify-center">
          <p className="cursor-pointer font-bold">↑</p>
          <p>
            {tempAxios.score !== null
              ? tempAxios.score
              : "The value is not available"}
          </p>
          <p className="cursor-pointer font-bold">↓</p>
        </div>
        <div className="flex flex-col gap-5 max-[500px]:w-[inherit] max-[500px]: pr-[30px]">
          <div className="flex flex-col gap-3">
            <h1 className="break-words whitespace-normal min-[500px]:w-[500px] font-semibold max-sm:text-[14px]">
              {
                <span className="text-[#777777] mr-2">
                  Posted by{" "}
                  <span className="font-sans">
                    {tempAxios.by}{" "}
                    <span className="ml-2 font-mono">
                      {moment.unix(tempAxios.time).fromNow()}
                    </span>
                  </span>
                </span>
              }
              <br />
              {tempAxios.title}
            </h1>
            <h1 className="break-words whitespace-normal min-[500px]:w-[500px] max-sm:text-[14px]">
              Sourse:{" "}
              <Link
                className="break-words whitespace-normal"
                href={tempAxios.url !== undefined ? tempAxios.url : "/"}
              >
                {tempAxios.url !== undefined ? (
                  tempAxios.url
                ) : (
                  <span className="text-red-600">
                    The link is not available
                  </span>
                )}
              </Link>
            </h1>
          </div>
          <Link className="flex gap-1" href={`/comments/${tempAxios.id}`}>
            <img className="w-[25px]" src="/images/chat.png" alt="chat-icon" />
            {tempAxios.descendants !== undefined ? (
              <h2 className="text-[gray] max-sm:text-[14px]">
                {tempAxios.descendants} comments
              </h2>
            ) : (
              <h2 className="text-[gray] max-sm:text-[14px]">0 comments</h2>
            )}
          </Link>
        </div>
      </div>
    );
  });
}
