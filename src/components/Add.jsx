import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";
import { useDropzone } from "react-dropzone";
import img from "../assets/image/imageUpload.jpg"; // Default image
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { addProjectAPI } from "../services/allAPI";
import { addResponseContext } from "../contexts/ContextAPI";
function Add() {
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [projectInputs, setProjectInputs] = useState({
    title: "",
    languages: "",
    description: "",
    image: "",
    website: "",
    github: "",
  });

  const toggle = () => {
    setModal(!modal);
    setProjectInputs({
      title: "",
      languages: "",
      description: "",
      image: "",
      website: "",
      github: "",
    });
  };
  const [imageFileStatus, setImageFileStatus] = useState(false);
  useEffect(() => {
    if (
      projectInputs.image.type == "image/png" ||
      projectInputs.image.type == "image/jpg" ||
      projectInputs.image.type == "image/jpeg"
    ) {
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(projectInputs.image));
    } else {
      setPreview(img);
      setImageFileStatus(false);
      setProjectInputs({ ...projectInputs, image: "" });
    }
  }, [projectInputs.image]);

  const [preview, setPreview] = useState("");
  const handleUploadProject = async () => {
    const { title, languages, description, image, website, github } =
      projectInputs;
    if (!title || !languages || !description || !image || !website || !github) {
      toast.error("Please fill the form completly !!");
    } else {
      console.log(projectInputs);
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", languages);
      reqBody.append("overview", description);
      reqBody.append("project_image", image);
      reqBody.append("website", website);
      reqBody.append("github", github);
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await addProjectAPI(reqBody, reqHeader);
          console.log(result);
          toggle();
          if (result.status == 200) {
            setAddResponse(result);
          } else {
            toast.error(result.response.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  return (
    <>
      <Button className="btn" onClick={toggle}>
        <i className="fa-solid fa-plus me-1"></i> Add New
      </Button>

      <Modal isOpen={modal} size="lg" toggle={toggle}>
        <ModalHeader toggle={toggle}>Project Details</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-wrap">
            {/* Left Section for Image Upload */}
            <div className="me-3">
              <label>
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setProjectInputs({
                      ...projectInputs,
                      image: e.target.files[0],
                    });
                  }}
                />
                <img
                  style={{ height: "200px", cursor: "pointer" }}
                  className="img-fluid"
                  src={preview}
                />
              </label>
              {!imageFileStatus && (
                <div className="text-danger">
                  Upload only following file types only : png, jpg, jpeg
                </div>
              )}
            </div>

            {/* Right Section for Inputs */}
            <div style={{ flex: 2 }}>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => {
                    setProjectInputs({
                      ...projectInputs,
                      title: e.target.value,
                    });
                  }}
                  id="projectTitle"
                  placeholder="Enter project title"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => {
                    setProjectInputs({
                      ...projectInputs,
                      languages: e.target.value,
                    });
                  }}
                  id="languageUsed"
                  placeholder="Enter languages used"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="url"
                  onChange={(e) => {
                    setProjectInputs({
                      ...projectInputs,
                      github: e.target.value,
                    });
                  }}
                  id="githubLink"
                  placeholder="Enter GitHub link"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="url"
                  onChange={(e) => {
                    setProjectInputs({
                      ...projectInputs,
                      website: e.target.value,
                    });
                  }}
                  id="websiteLink"
                  placeholder="Enter website link"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  onChange={(e) => {
                    setProjectInputs({
                      ...projectInputs,
                      description: e.target.value,
                    });
                  }}
                  id="projectOverview"
                  placeholder="Enter project overview"
                  required
                />
              </FormGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleUploadProject} color="primary">
            Upload Project
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Add;
