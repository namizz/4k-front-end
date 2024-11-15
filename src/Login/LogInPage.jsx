// Create a Login page
// we need to options
// Login and Signup
// finally send phone number and password to login route or
// navigate to createUser route
import React from "react";
import { useNavigate } from "react-router-dom";

const Input = (props) => {
  return (
    <input
      placeholder={`${props.msg || "(e.g 0991065050)"} `}
      className="bg-transparent border-b-2 border-[#ebf1f0] placeholder-slate-600 text-teal-50  font-semibold text-[1em] placeholder-opacity-60 rounded-lg py-2 px-6 w-80 mb-4 focus:outline-none focus:border-[#1c5d66] focus:bg-[#90b2c544] focus:text-lg transition-all hover:bg-[#ffffff44]"
      type={props.type || "text"}
    />
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const BeMember = () => {
    return navigate("/createUser");
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form className="flex flex-col items-center bg-slate-100 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg w-full max-w-sm">
        <p className="text-[#2f678d] text-4xl mb-12 font-bold font-jolly-lodger">
          4K Fellowship LogIn
        </p>
        <Input msg="Phone Number (e.g 0991065050)" />
        <Input msg="Password" type="password" />

        <button
          type="submit"
          className="bg-[#fff3ac] text-stone-700 py-3 w-80 rounded-lg mt-8 text-lg font-medium transition-all shadow-[0_0_10px_#faebd7,0_0_10px_#faebd7] hover:bg-[#FFD700] hover:shadow-none"
        >
          Login
        </button>

        <div className="text-[#10222e] pt-6 underline " onClick={BeMember}>
          Be Member
        </div>
      </form>
    </div>
  );
};

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
