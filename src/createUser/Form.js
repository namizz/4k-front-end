import React from "react";
import InputBox from "../components/InputBox";
import Image from "../imageUploader/Image";
import { useNavigate } from "react-router-dom";

const Form = () => {
  //take the input in the frame element return it in to json file
  const [Info, setInfo] = React.useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
    church: "",
    country: "",
    phone: "",
    region: "",
    email: "",
    department: "",
    batch: "",
    img: "",
    fav_verse: "",
    password: "",
  });

  const [required, setRequirement] = React.useState({
    fi: "none",
    la: "none",
    ph: "none",
    de: "none",
    ba: "none",
  });
  const [isExisting, setExisting] = React.useState("");
  const [submitMessage, setSubmit] = React.useState("");
  const setImgUrlInInfo = (url) => {
    setInfo((prev) => ({
      ...prev,
      img: url,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (submitMessage) setSubmit("");
  };
  const requiredUnfilled = () => {
    if (
      !(
        Info.firstname &&
        Info.lastname &&
        Info.phone &&
        Info.department &&
        Info.batch
      )
    ) {
      const updateRequirment = { ...required };
      console.log(updateRequirment);
      for (let i in Info) {
        // console.log(String(i).slice(0, 2));
        if (!Info[i]) {
          if (String(i).slice(0, 2) in required) {
            updateRequirment[String(i).slice(0, 2)] = "flex";
          }
        } else {
          if (String(i).slice(0, 2) in required) {
            updateRequirment[String(i).slice(0, 2)] = "none";
          }
        }
      }
      setRequirement(updateRequirment);
      return false;
    } else return true;
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //post the json file to the backend
    if (requiredUnfilled()) {
      try {
        const response = await fetch(
          "https://aau-4k-fellowship.onrender.com/4kfellowhship",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Info),
          }
        );
        const m = await response.json();
        if (response.ok) {
          setSubmit("The Information has been Submitted!");
          setExisting("");
          navigate(`/update?phone=${Info.phone}`);

          console.log("Data submitted successfully");
        } else {
          setExisting(m.msg);
          console.log(isExisting);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    } else {
      console.log("cannot submit");
      return;
    }
  };

  // frame to create all the data
  // after all the element are create there will be a submit button
  // take the value of each inputs box and store it on array or different variable, on click of sumbit----> useState or useEffect
  // //
  // margin: 0vw 4vw;
  // padding: 1vw 0;background-color: rgb(114, 114, 114);
  return (
    <form id="form" onSubmit={handleSubmit}>
      <div className="bg-[#f5f5fc9d]">
        <div id="personal-information" className="mx-[4vw] py-[1vw]">
          <h4 id="h4">PERSONAL INFORMATION</h4>
          <InputBox
            name="firstname"
            p="First Name"
            value={Info.firstname}
            change={handleChange}
            display={required.fi}
          />
          <InputBox
            name="lastname"
            p="Last Name"
            value={Info.lastname}
            change={handleChange}
            display={required.la}
          />
          <br />
          <InputBox
            name="church"
            p="Team"
            value={Info.church}
            change={handleChange}
            type="combo"
            options={[
              "Member",
              "Prayer",
              "Bible Study",
              "Leader",
              "Evangelical",
              "Worship",
              "Literature",
            ]}
          />
          <InputBox
            name="date_of_birth"
            p="Date of Birth"
            type="date"
            value={Info.date_of_birth}
            change={handleChange}
          />
        </div>
        <hr />
        <div className="mx-[4vw] py-[1vw]">
          <h4 id="h4">ADDRESS LINE</h4>
          <InputBox
            name="country"
            p="Country"
            value={Info.country}
            change={handleChange}
          />
          <InputBox
            name="region"
            p="Region"
            value={Info.region}
            change={handleChange}
          />
          <br />
          <InputBox
            name="phone"
            p="Phone Number"
            value={Info.phone}
            change={handleChange}
            display={required.ph}
            msg={isExisting}
          />
          <InputBox
            name="email"
            p="Email"
            value={Info.email}
            change={handleChange}
          />
        </div>
        <hr />
        <div className="mx-[4vw] py-[1vw]">
          <h4 id="h4">MORE INFORMATION</h4>
          <InputBox
            name="department"
            p="Department"
            value={Info.department}
            change={handleChange}
            display={required.de}
          />
          <br />
          <InputBox
            name="batch"
            p="Batch"
            value={Info.batch}
            change={handleChange}
            display={required.ba}
          />
          <br />
          <p className="text-sm text-gray-700 font-[600] mx-[2vw] py-[1vw]">
            Upload profile pic
          </p>
          <Image setImgUrlInInfo={setImgUrlInInfo} />
          <InputBox
            name="fav_verse"
            p="Favorite Bible Verse"
            value={Info.fav_verse}
            change={handleChange}
          />
          <p
            style={
              submitMessage
                ? { display: "block", margin: "0 20%", fontWeight: 500 }
                : { display: "none" }
            }
            id="success"
          >
            {submitMessage}
          </p>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="text-white text-[1em] bg-[#2c2c5a] py-[0.7em] px-[2em] rounded-xl hover:bg-[#393974]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
