import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Form from "./createUser/Form";
import Header from "./components/Header";
import UpdateForm from "./updateUser/Form";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Main from "./Main/Main";
import LoginPage from "./Login/LogInPage";
import { UserProvider } from "./UserContent/UserContent"; // Import UserProvider
import { AuthProvider } from "./Authentication.js/AuthContext";

const CreateUserPage = () => {
  return (
    <div className="bg-[#EFF0F8]">
      <Header />
      <Form />
    </div>
  );
};
const EditUserPage = () => {
  return (
    <div id="editpage">
      <Header />
      <UpdateForm />
    </div>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        {" "}
        {/* Wrap the entire app in UserProvider */}
        <Routes>
          <Route path="/createuser" element={<CreateUserPage />} />
          <Route path="/update" element={<EditUserPage />} />
          <Route path="/" element={<Main />} /> {/* Main page */}
          <Route path="/login" element={<LoginPage />} /> {/* Login page */}
        </Routes>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
