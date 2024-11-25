import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContent/UserContent";
import { jwtDecode } from "jwt-decode";

import { AuthContext } from "../Authentication.js/AuthContext";

// Input component for reusable input field
const Input = (props) => {
  return (
    <input
      placeholder={`${props.msg || "(e.g 0991065050)"} `}
      className="bg-transparent border-b-2 border-[#ebf1f0] placeholder-[#000] text-[#000000] font-semibold text-[1em] placeholder-opacity-60 rounded-lg py-2 px-6 w-80 mb-4 focus:outline-none focus:border-[#ffd689] focus:text-lg transition-all hover:bg-[#ffffff1e]"
      type={props.type || "text"}
      name={props.name} // Added name to associate the input with the state
      value={props.value} // Value binding for controlled input
      onChange={props.onChange} // Handle change for both inputs
    />
  );
};

// LoginForm Component
const LoginForm = () => {
  const { token, setToken } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (token && typeof token === "string") {
        // Check if token is valid and a string
        try {
          // Decode the token to check if it's valid
          const decoded = jwtDecode(token);
          console.log(decoded);
          const isExpired = decoded.exp < Date.now() / 1000;
          const response = decoded.password
            ? await fetch(
                `https://aau-4k-fellowship.onrender.com/4kfellowhship?phone=${decoded.phone}&password=${decoded.password}`
              )
            : await fetch(
                `https://aau-4k-fellowship.onrender.com/4kfellowhship?phone=${decoded.phone}`
              );
          const data = await response.json();
          console.log("data", data[0]);

          // Check if user is found and password matches
          if (data && data.length > 0) {
            setUser(data[0]);
          }

          if (!isExpired) {
            navigate("/"); // Redirect if the token is valid and not expired
          } else {
            localStorage.removeItem("jwtToken");
            setToken(null); // Remove expired token from AuthContext and localStorage
          }
        } catch (err) {
          console.error("Invalid token", err);
          localStorage.removeItem("jwtToken");
          setToken(null); // Clear invalid token
        }
      } else {
        console.error("Token is null or invalid:", token);
      }
    };

    fetchData();
  }, [token, setToken, navigate, setUser]);

  // State to store phone number and password
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(""); // To store error message if login fails

  // Navigate to createUser route if user is new
  const BeMember = () => {
    return navigate("/createUser");
  };

  // Handle input changes for phone and password
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhone(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Fetch data from the server to validate the credentials
  //   console.log("phone", phone, "password", password);
  //   try {
  //     const response = await fetch(
  //       `https://aau-4k-fellowship.onrender.com/4kfellowhship?phone=${phone}&password=${password}`
  //     );
  //     const data = await response.json();
  //     console.log(data[0].password);

  //     // Check if user is found and password matches
  //     if (
  //       data && data.length > 0 && data[0].password
  //         ? data[0].password === password
  //         : true
  //     ) {
  //       setUser(data[0]);
  //       // Credentials are valid, navigate to the main page
  //       navigate("/"); // Replace "/mainPage" with your actual main page route
  //     } else {
  //       // Credentials are incorrect, show an error
  //       setError("Invalid phone number or password. Please try again.");
  //     }
  //   } catch (err) {
  //     setError("Error occurred while logging in. Please try again.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Phone:", phone, "Password:", password);

    try {
      const response = await fetch(
        "https://aau-4k-fellowship.onrender.com/4kfellowhship/login",
        {
          method: "POST", // Using POST for login
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, password }), // Sending phone and password in the request body
        }
      );
      const data = await response.json();
      console.log("data", data);
      console.log("Token from server:", data.token);

      if (response.ok && data.token) {
        setToken(data.token); // Save the token in AuthContext
        localStorage.setItem("jwtToken", data.token); // Store token in localStorage
        navigate("/"); // Redirect to the main page
      } else {
        setError(data.message || "Invalid phone number or password.");
      }
    } catch (err) {
      setError("Error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col items-center bg-gray-800 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <p className="text-[#2f678d] text-4xl mb-12 font-bold font-jolly-lodger">
          4K Fellowship LogIn
        </p>
        <Input
          msg="Phone Number (e.g 0991065050)"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        <Input
          msg="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="bg-gradient-to-br from-[#ffef93] to-[#fcb045] text-blue-800 py-3 w-80 rounded-lg mt-8 text-lg font-medium  hover:from-[#fff176] hover:to-[#ffd54f] transition-all duration-600 "
        >
          Login
        </button>

        <div
          className="text-[#f3e17ade] bg-slate-600 p-1 px-4 rounded-xl bg-opacity-35 mt-6 hover:text-green-200 hover:bg-opacity-80 hover:bg-slate-800 transition-all duration-100"
          onClick={BeMember}
        >
          Be Member
        </div>
      </form>
    </div>
  );
};

// LoginPage component (background image and LoginForm)
const LoginPage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center backdrop-blur-2xl"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/000/135/876/non_2x/holy-week-day-free-vector.jpg')`,
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
