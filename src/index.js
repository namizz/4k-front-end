import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Form from "./createUser/Form";
import Header from "./components/Header";
import UpdateForm from "./updateUser/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main/Main";
import LoginPage from "./Login/LogInPage";

const CreateUserPage = () => {
  return (
    <div id="create-page">
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
  <Router>
    <Routes>
      <Route path="/createuser" element={<CreateUserPage />} />
      <Route path="/update" element={<EditUserPage />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
