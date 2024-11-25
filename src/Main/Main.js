import React, { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Card from "../components/Card";
import FilterBox from "../components/FilterBox";
import { useUser } from "../UserContent/UserContent";
import { AuthContext } from "../Authentication.js/AuthContext";
import EditButton from "../components/Edit";
import LogoutImg from "../components/Logout";
import { useNavigate } from "react-router-dom";

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
      <FilterBox
        dept={"Leaders"}
        onClick={() => clickFilter("church", "Leader")}
      />
      <FilterBox
        dept={"CS"}
        onClick={() => clickFilter("department", "Computer Science")}
      />
      <FilterBox
        dept={"Statistics"}
        onClick={() => clickFilter("department", "Statistics")}
      />

      <FilterBox
        dept={"Prayer"}
        onClick={() => clickFilter("church", "Prayer team")}
      />
      <FilterBox dept={"2026"} onClick={() => clickFilter("batch", "2026")} />
      <FilterBox dept={"2027"} onClick={() => clickFilter("batch", "2027")} />
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
          <p className="text-yellow-600 font-semibold text-cardtext">Filter</p>
          <FilterBoxes clickFilter={clickFilter} />
        </div>
        <img
          src="https://png.pngtree.com/png-vector/20230915/ourmid/pngtree-minimalist-yellow-lines-border-png-image_10086268.png "
          alt="yellow line"
          className="bg-transparent w-[3vw] border relative right-0 object-cover "
        />
      </div>
      <hr className="border-blue-400 border-opacity-65 w-full mt-1" />
    </div>
  );
};
// CardBox component inside Main.js or as a separate component
const CardBox = ({ marked, user }) => {
  const [Info, setInfo] = React.useState([]);

  React.useEffect(() => {
    fetch("https://aau-4k-fellowship.onrender.com/4kfellowhship")
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

  const filteredInfo = Info.filter((data) => {
    if (!data || !data.phone) return false;

    // Apply department filter
    const matchesDepartment = marked.department
      ? data.department === marked.department
      : true;

    // Apply church filter
    const matchesChurch = marked.church ? data.church === marked.church : true;

    // Apply batch filter
    const matchesBatch = marked.batch ? data.batch === marked.batch : true;

    return matchesDepartment && matchesChurch && matchesBatch;
  });

  return (
    <div className="m-7 mx-28 xl:mx-44 flex flex-wrap justify-evenly p-0">
      {filteredInfo.length > 0 ? (
        filteredInfo.map((data) => (
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
            user={user}
          />
        ))
      ) : Info.length > 0 ? (
        <p>No data exist with filter</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const Main = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  console.log(API_URL, "api"); // Should log: https://aau-4k-fellowship.onrender.com/4kfellowhship

  const { user, setUser } = useUser();
  console.log("user", user);
  const { logout } = useContext(AuthContext);
  const [Verse, setVerse] = React.useState("");
  const [bookName, setBookName] = React.useState("");
  const [marked, setMarked] = React.useState({
    department: "",
    church: "",
    batch: "",
  });
  const [token, setToken] = React.useState(localStorage.getItem("jwtToken")); // Retrieve token from localStorage
  useEffect(() => {
    console.log("check", token);

    if (!user && token && typeof token === "string") {
      console.log("no token");

      try {
        // Decode the token to check if it's valid
        const decoded = jwtDecode(token);
        console.log("decode", decoded);
        const isExpired = decoded.exp < Date.now() / 1000;

        if (isExpired) {
          localStorage.removeItem("jwtToken");
          setToken(null); // Remove expired token
        } else {
          // Construct the fetch URL depending on whether `password` is included
          const queryParams = `phone=${decoded.phone}`;
          const fetchUrl = decoded.password
            ? `https://aau-4k-fellowship.onrender.com/4kfellowhship?${queryParams}&password=${decoded.password}`
            : `https://aau-4k-fellowship.onrender.com/4kfellowhship?${queryParams}`;

          // Fetch user data based on the decoded information (e.g., phone and password)
          fetch(fetchUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.length > 0) {
                setUser(data[0]); // Set user data in state if valid
              }
            })
            .catch((err) => console.error("Error fetching user:", err));
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("jwtToken");
        setToken(null); // Clear invalid token
      }
    } else {
      console.error("Token is null or invalid:");
    }
  }, [token, user, setToken, setUser]);

  const clickFilter = (type, value) => {
    setMarked((prev) => {
      // If the filter is already applied, remove it by setting it to an empty string
      if (prev[type] === value) {
        return { ...prev, [type]: "" }; // Remove the filter
      } else {
        return { ...prev, [type]: value }; // Apply the filter
      }
    });
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
          `http://localhost:10000/4kfellowhship/api/book/${Verse.book}`
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
  const navigate = useNavigate();

  const logger = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white">
      <Header />
      {user ? (
        <div>
          <img
            src={
              user.img ||
              "https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
            }
            alt="user-image"
            className="w-20 rounded-full h-20 object-cover absolute top-[0.5em] right-[6em] border-4 border-blue-950 border-opacity-10"
          />
          <button
            onClick={logout} // Trigger logout function when clicked
            className="absolute top-0 right-10"
          >
            <LogoutImg />
            {/* <LogoutImg /> */}
          </button>

          <EditButton phone={user.phone} />
          <div className="absolute top-14 right-[11em] opacity-40 text-or hover:opacity-80 ">
            {user.firstname}
          </div>
        </div>
      ) : (
        <div
          className="absolute top-6 right-28 px-4 py-2 bg-[#ffa127e3] text-white rounded-3xl shadow-lg cursor-pointer hover:bg-green-700 transition-all duration-200"
          onClick={logger}
        >
          Log In +
        </div>
      )}

      <div className="h-1 w-10/12 border-orange-200 border-y-4 mx-auto"></div>
      <Welcome />

      <BibleQuote
        book={bookName}
        verse={Verse.text}
        chapter={Verse.chapter}
        num={Verse.verse}
      />
      <FilterDiv clickFilter={clickFilter} />
      <CardBox marked={marked} user={user ? user.church : null} />
    </div>
  );
};

export default Main;
