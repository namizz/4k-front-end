import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Form from "./createUser/Form";
import Header from "./components/Header";
import UpdateForm from "./updateUser/Form";

const CreateUserPage = () => {
  return (
    <div id="create-page">
      <Header />
      <Form />
      <UpdateForm />
    </div>
  );
};
ReactDOM.render(
  <div>
    <CreateUserPage />
  </div>,
  document.getElementById("root")
);
