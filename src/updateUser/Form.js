import EditBox from "../components/EditBox";
import React from "react";
import EditIcon from "../components/EditIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Authentication.js/AuthContext";
import Image from "../imageUploader/Image";

const UpdateForm = (props) => {
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
    password: "",
  });

  // Initialize useNavigate hook here at the component level
  const navigate = useNavigate();

  // Extract phone from the URL query parameter using useLocation
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phone = searchParams.get("phone");
  console.log("phone", phone);

  React.useEffect(() => {
    fetch(
      `https://aau-4k-fellowship.onrender.com/4kfellowhship?phone=${
        phone || "0991065050"
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setInfo(data[0]);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, [phone]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (e.target.name === "skip") {
      navigate("/"); // Now correctly using navigate here
    }

    const response = await fetch(
      `https://aau-4k-fellowship.onrender.com/4kfellowhship/edit`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Info),
      }
    );

    if (!response.ok) {
      console.log("Error in update");
      return;
    }

    const result = await response.json(); // Wait for the result
    console.log(result); // Log the response if needed
    navigate("/");
  };

  const CreatePassword = () => {
    const { setToken } = React.useContext(AuthContext);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    // Handle password change
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    // Handle confirm password change
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };

    // Form submission
    const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if the passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setSuccess(false);
        return;
      }

      // Reset error and proceed with submission
      setError("");

      setInfo((prev) => ({
        ...prev,
        password: password,
      })); // Create the data object to send to backend

      try {
        const response = await fetch(
          "https://aau-4k-fellowship.onrender.com/4kfellowhship/edit",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...Info, password }),
          }
        );
        console.log(response.json(), Info.phone, password);
        if (response.ok) {
          setSuccess(true);
          const phone = Info.phone;
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
          setPassword("");
          setConfirmPassword("");
          navigate("/");
        } else {
          setError("Failed to create password");
          setSuccess(false);
        }
      } catch (err) {
        setError("Error occurred while creating the password");
        setSuccess(false);
      }
    };

    return (
      <div className="flex items-center justify-center  bg-[#c7e8f738] mb-8  mx-40 rounded-3xl">
        <div className="p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            {Info.firstname} please create a password for security issue
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center mb-4">
                Password created successfully!
              </p>
            )}
            <div className="flex">
              <button
                name="submit"
                type="submit"
                className="w-full py-3 mx-2 bg-[#e28132] text-white font-semibold rounded-md hover:bg-[#f79546] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Password
              </button>
              <button
                name="skip"
                onClick={() => navigate("/")} // Updated here for the skip button
                className="w-[20%] py-3 mx-2  text-blue-800 font-semibold rounded-md hover:text-blue-900"
              >
                Skip
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const setImgUrlInInfo = (url) => {
    setInfo((prev) => ({
      ...prev,
      img: url,
    }));
  };
  // margin: 0vw 0vw;
  // padding: 0vw 0;
  // display: flex;
  // align-items: flex-start;
  return (
    <div className="bg-[#f1efeb]">
      {Info.password === null ? <CreatePassword /> : null}
      <form id="update-form" onSubmit={handleUpdate}>
        {Info.img ? (
          <img src={Info.img} id="editimage" alt="Profile" />
        ) : (
          <Image setImgUrlInInfo={setImgUrlInInfo} />
        )}
        <h4>PERSONAL INFORMATION</h4>
        <div className="flex">
          <div className="flex flex-wrap justify-center">
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
              p="Team"
              value={Info.church}
              change={handleChange}
              edit={editor.editmode1}
            />
          </div>
          <EditIcon onClick={EditMode} value="editmode1" />
        </div>
        <hr />
        <h4>ADDRESS LINE</h4>
        <div className="flex">
          <div id="a-l" className="flex flex-wrap justify-center ">
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
        <div id="umore-info" className="flex">
          <div id="umore-infopart" className="flex justify-center flex-wrap">
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
        <button
          className="text-white text-[1em] bg-[#2c2c5a] py-[0.7em] px-[2em] rounded-xl hover:bg-[#393974] mb-4"
          type="submit"
          value="Update"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
