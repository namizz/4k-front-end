import React, { useState } from "react";
import Card from "../components/Card";

const Header = () => {
  return (
    <h1 className="text-custom-orange text-5xl font-jolly-lodger border-gray-950 p-5 text-center font-bold">
      4K FellowShip{" "}
    </h1>
  );
};
const Welcome = () => {
  const text = "...Welcome to 4k fellow group...";
  return (
    <p className="font-jolly-lodger text-center text-blue-950 text-3xl p-2 ">
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={`inline-block animate-letter-appear opacity-0 delay-[${
            index * 200
          }ms]`}
        >
          {letter}
        </span>
      ))}
    </p>
  );
};
const BibleQuote = ({ book, chapter, num, verse }) => {
  return (
    <p className="p-3 px-10 font-semibold flex flex-col text-base mx-15">
      <div className="font-jolly-lodger text-blue-950 flex justify-start text-sm">
        Bible Verse
      </div>
      <div className="flex justify-center text-center">" {verse}" </div>
      <div className="text-custom-orange flex justify-end px-60">
        {book ? `${book}: ${chapter}:${num}` : "Loading book..."}{" "}
      </div>
    </p>
  );
};
const CardBox = () => {
  return (
    <div className="border m-7 mx-28 flex h-96">
      <Card />
    </div>
  );
};

const Main = () => {
  const [Verse, setVerse] = React.useState("");
  const [bookName, setBookName] = React.useState("");

  // First useEffect to fetch the Bible verse
  React.useEffect(() => {
    const BibleVerse = async () => {
      try {
        const quote = await fetch("https://bolls.life/get-random-verse/YLT/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!quote.ok) return "Not Fetched Correctly";
        const q = await quote.json();
        setVerse({
          text: q.text,
          chapter: q.chapter,
          verse: q.verse,
          book: q.book,
        });
      } catch (error) {
        console.error("Error fetching Bible verse:", error);
      }
    };

    BibleVerse();
  }, []);
  React.useEffect(() => {
    if (!Verse.book) return;
    const fetchBookName = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/4kfellowhship/api/book/${Verse.book}`
        );
        if (!response.ok) {
          console.log("Error: Book not found");
          return;
        }

        const data = await response.json();
        if (data.bookName) {
          setBookName(data.bookName);
        } else {
          console.log("Book not found");
        }
      } catch (err) {
        console.log("Error fetching book name:", err);
      }
    };

    fetchBookName();
  }, [Verse.book]);

  return (
    <div className="bg-white">
      <Header />
      <div className="h-1 w-10/12 border-orange-200 border-y-4 mx-auto"></div>
      <Welcome />
      <BibleQuote
        book={bookName}
        verse={Verse.text}
        chapter={Verse.chapter}
        num={Verse.verse}
      />
      <CardBox />
    </div>
  );
};

export default Main;
