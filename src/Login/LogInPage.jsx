import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Input component for reusable input field
const Input = (props) => {
  return (
    <input
      placeholder={`${props.msg || "(e.g 0991065050)"} `}
      className="bg-transparent border-b-2 border-[#ebf1f0] placeholder-slate-600 text-card-blue font-semibold text-[1em] placeholder-opacity-60 rounded-lg py-2 px-6 w-80 mb-4 focus:outline-none focus:border-[#1c5d66] focus:bg-[#90b2c544] focus:text-lg transition-all hover:bg-[#ffffff44]"
      type={props.type || "text"}
      name={props.name} // Added name to associate the input with the state
      value={props.value} // Value binding for controlled input
      onChange={props.onChange} // Handle change for both inputs
    />
  );
};

// LoginForm Component
const LoginForm = () => {
  const navigate = useNavigate();

  // State to store phone number and password
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch data from the server to validate the credentials
    console.log("phone", phone, "password", password);
    try {
      const response = await fetch(
        `http://localhost:4000/4kfellowhship?phone=${phone}&password=${password}`
      );
      const data = await response.json();

      // Check if user is found and password matches
      if (data && data.length > 0 && data[0].password === password) {
        // Credentials are valid, navigate to the main page
        navigate("/"); // Replace "/mainPage" with your actual main page route
      } else {
        // Credentials are incorrect, show an error
        setError("Invalid phone number or password. Please try again.");
      }
    } catch (err) {
      setError("Error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col items-center bg-slate-100 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg w-full max-w-sm"
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
          className="bg-[#fff3ac] text-stone-700 py-3 w-80 rounded-lg mt-8 text-lg font-medium transition-all shadow-[0_0_10px_#faebd7,0_0_10px_#faebd7] hover:bg-[#FFD700] hover:shadow-none"
        >
          Login
        </button>

        <div className="text-[#10222e] pt-6 underline" onClick={BeMember}>
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
