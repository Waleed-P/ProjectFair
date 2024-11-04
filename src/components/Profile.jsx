import React, { useEffect, useState } from "react";
import { Collapse } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import profileImg from "../assets/image/profile.png"; // Default profile image
import { SERVER_URL } from "../services/serverUrl";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { updateUserAPI } from "../services/allAPI";
function Profile() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedIn: "",
    profileImage: "",
  });
  const [existingImg, setExistingImg] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (userDetails.profileImage) {
      setPreview(URL.createObjectURL(userDetails.profileImage));
    } else {
      setPreview("");
    }
  }, [userDetails.profileImage]);

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        ...userDetails,
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.password,
        github: existingUser.github,
        linkedIn: existingUser.linkedIn,
      });
      setExistingImg(existingUser.profile);
    }
  }, [open]);

  const handleUserProfile = async () => {
    const { username, email, password, linkedIn, github, profileImage } =
      userDetails;
    if (!github || !linkedIn) {
      toast.error("Please fill the form completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("linkedIn", linkedIn);
      reqBody.append("github", github);
      preview
        ? reqBody.append("profile_image", profileImage)
        : reqBody.append("profile_image", existingImg);
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await updateUserAPI(reqBody, reqHeader);
          if (result.status === 200) {
            toast.success("User Profile Updated Successfully");
            setOpen(!open);
            sessionStorage.setItem("existingUser", JSON.stringify(result.data));
          } else {
            console.log(result);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h3 className="text-warning me-2">User Profile</h3>
        <button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className="btn text-warning fw-bolder"
        >
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
      <Collapse isOpen={open}>
        <div
          id="example-collapse-text"
          className="p-3 rounded row justify-content-center shadow"
        >
          <label>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  profileImage: e.target.files[0],
                })
              }
            />
            {existingImg == "" ? (
              <img
                width={100}
                className="rounded-circle"
                src={preview ? preview : profileImg}
                alt="Profile"
              />
            ) : (
              <img
                width={100}
                className="rounded-circle"
                src={preview ? preview : `${SERVER_URL}/uploads/${existingImg}`}
                alt="Profile"
              />
            )}
          </label>
          <div className="mb-2 mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Github URL"
              value={userDetails.github}
              onChange={(e) =>
                setUserDetails({ ...userDetails, github: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="LinkedIn URL"
              value={userDetails.linkedIn}
              onChange={(e) =>
                setUserDetails({ ...userDetails, linkedIn: e.target.value })
              }
            />
          </div>
          <div className="d-grid">
            <button onClick={handleUserProfile} className="btn btn-warning">
              Update Profile
            </button>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default Profile;
