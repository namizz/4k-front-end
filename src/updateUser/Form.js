import EditBox from "../components/EditBox";
import React from "react";
import EditIcon from "../components/EditIcon";

const UpdateForm = () => {
  const [Info, setInfo] = React.useState({
    firstname: "",
    lastname: "",
    date_of_birth: null,
    church: "",
    country: "",
    phone: "",
    region: "",
    email: "",
    department: "",
    batch: "",
    img: "",
    fav_verse: "",
  });

  React.useEffect(() => {
    const api = fetch("http://localhost:4000/4kfellowhship/15")
      .then((response) => response.json())
      .then((data) => {
        setInfo(data[0]);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [editor, setEditor] = React.useState({
    editmode1: false,
    editmode2: false,
    editmode3: false,
  });
  const EditMode = (value) => {
    console.log(value);
    setEditor(false);
    setEditor((prev) => ({
      ...prev,
      [value]: !editor[value],
    }));
  };

  return (
    <form id="update-form">
      <img src={Info.img} id="editimage" />
      <h4>PERSONAL INFORMATION</h4>
      <div id="upersonal-information">
        <div id="p-i">
          <EditBox
            p="First Name"
            name="firstname"
            value={Info.firstname}
            onChange={handleChange}
            edit={editor.editmode1}
          />
          <EditBox
            name="lastname"
            p="Last Name"
            value={Info.lastname}
            change={handleChange}
            edit={editor.editmode1}
          />
          <br />
          <EditBox
            name="date_of_birth"
            p="Date of Birth"
            type="date"
            value={Info.date_of_birth}
            change={handleChange}
            edit={editor.editmode1}
          />
          <EditBox
            name="church"
            p="Church"
            value={Info.church}
            change={handleChange}
            edit={editor.editmode1}
          />
        </div>
        <EditIcon onClick={EditMode} value="editmode1" />
      </div>
      <hr />
      <h4>ADDRESS LINE</h4>
      <div id="uaddress">
        <div id="a-l">
          <EditBox
            name="country"
            p="Country"
            value={Info.country}
            change={handleChange}
            edit={editor.editmode2}
          />
          <EditBox
            name="region"
            p="Region"
            value={Info.region}
            change={handleChange}
            edit={editor.editmode2}
          />
          <br />
          <EditBox
            name="phone"
            p="Phone Number"
            value={Info.phone}
            change={handleChange}
            edit={editor.editmode2}
          />
          <EditBox
            name="email"
            p="Email"
            value={Info.email}
            change={handleChange}
            edit={editor.editmode2}
          />
        </div>
        <EditIcon onClick={EditMode} value="editmode2" />
      </div>
      <hr />
      <h4>MORE INFORMATION</h4>
      <div id="umore-info">
        <div id="umore-infopart">
          <EditBox
            name="department"
            p="Department"
            value={Info.department}
            change={handleChange}
            edit={editor.editmode3}
          />
          <br />
          <EditBox
            name="batch"
            p="Batch"
            value={Info.batch}
            change={handleChange}
            edit={editor.editmode3}
          />
          <br />
          <EditBox
            name="fav_verse"
            p="Favorite Bible Verse"
            value={Info.fav_verse}
            change={handleChange}
            edit={editor.editmode3}
          />
        </div>
        <EditIcon onClick={EditMode} value="editmode3" />
      </div>
      <button id="submit" type="submit" value="Update">
        Update
      </button>
    </form>
  );
};
export default UpdateForm;
