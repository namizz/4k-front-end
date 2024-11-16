import React, { useContext } from "react";
import Card from "../components/Card";
import FilterBox from "../components/FilterBox";
import { useUser } from "../UserContent/UserContent";
import { AuthContext } from "../Authentication.js/AuthContext";

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
    <div className="p-3 px-20 font-semibold flex flex-col text-biblequote mx-15">
      <p className="font-jolly-lodger text-blue-950 flex justify-start text-[1.3vw] px-[12%]">
        ------------------Bible Verse---------------
      </p>
      <div className="flex justify-center text-center">" {verse}" </div>
      <div className="text-custom-orange flex justify-end px-60">
        {book ? `${book}: ${chapter}:${num}` : "Loading book..."}{" "}
      </div>
    </div>
  );
};

const FilterBoxes = ({ clickFilter }) => {
  return (
    <div className="flex">
      <FilterBox dept={"CS"} onClick={clickFilter} />
      <FilterBox dept={"Prayer"} />
    </div>
  );
};

const FilterDiv = ({ clickFilter }) => {
  return (
    <div className="mx-32">
      <div className="bg-gradient-to-r from-[#365583] to-[#163252] rounded-tl-3xl">
        <p className="text-white text-[2vw] px-24">List of Members</p>
      </div>
      <div className="flex justify-between ml-12">
        <div className="">
          <p className="text-yellow-600 font-semibold text-[1.2vw]">Filter</p>
          <FilterBoxes clickFilter={clickFilter} />
        </div>
        <img
          src="https://png.pngtree.com/png-vector/20230915/ourmid/pngtree-minimalist-yellow-lines-border-png-image_10086268.png "
          alt="yellow line"
          className="bg-transparent w-[6%] object-cover "
        />
      </div>
      <hr className="border-blue-400 border-opacity-65 w-full mt-1" />
    </div>
  );
};

const CardBox = ({ marked }) => {
  const [Info, setInfo] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:4000/4kfellowhship")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Http error");
        }
        return response.json();
      })
      .then((data) => {
        setInfo(data);
      })
      .catch((err) => console.log("Error", err));
  }, []);

  return (
    <div className="m-7 mx-28 xl:mx-44 flex flex-wrap justify-evenly p-0">
      {Info.length > 0 ? (
        Info.filter((data) => data !== undefined).map((data) => {
          //console.log(data);
          return data.phone ? (
            marked ? (
              data.department == "Computer Science" ? (
                <Card
                  key={data.id}
                  batch={data.batch}
                  firstname={data.firstname}
                  lastname={data.lastname}
                  phone={data.phone}
                  team={data.church}
                  img={data.img}
                  dept={data.department}
                  email={data.email}
                  faverse={data.fav_verse}
                  country={data.country.slice(0, 3).toUpperCase()}
                />
              ) : null
            ) : (
              <Card
                key={data.id}
                batch={data.batch}
                firstname={data.firstname}
                lastname={data.lastname}
                phone={data.phone}
                team={data.church}
                img={data.img}
                dept={data.department}
                email={data.email}
                faverse={data.fav_verse}
                country={data.country.slice(0, 3).toUpperCase()}
              />
            )
          ) : null;
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const Main = () => {
  const { user } = useUser();
  console.log("user", user);
  const { logout } = useContext(AuthContext);
  const [Verse, setVerse] = React.useState("");
  const [bookName, setBookName] = React.useState("");
  const [marked, setMarked] = React.useState(false);
  const clickFilter = () => {
    setMarked(true);
  };

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
      {
        //check
      }
      {user ? (
        <img
          src={user.img}
          alt="user image"
          className="w-20 rounded-full h-25 object-cover absolute top-0 right-20"
        />
      ) : null}
      <div className="h-1 w-10/12 border-orange-200 border-y-4 mx-auto"></div>
      <Welcome />
      {user ? (
        <button
          onClick={logout} // Trigger logout function when clicked
          className="bg-red-500 text-white p-2 rounded-full absolute top-0 right-10"
        >
          Log Out
        </button>
      ) : null}

      <BibleQuote
        book={bookName}
        verse={Verse.text}
        chapter={Verse.chapter}
        num={Verse.verse}
      />
      <FilterDiv clickFilter={clickFilter} />
      <CardBox marked={marked} />
    </div>
  );
};

export default Main;
