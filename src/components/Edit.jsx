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
import { SERVER_URL } from "../services/serverUrl";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { editProjectAPI } from "../services/allAPI";
import { addResponseContext } from "../contexts/ContextAPI";
function Edit({ project }) {
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  console.log(project);
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectData, setProjectData] = useState({
    id: project?._id,
    title: project?.title,
    language: project?.language,
    overview: project?.overview,
    gihub: project?.github,
    website: project?.website,
    projectImage: "",
  });
  const toggleModalOpen = () => {
    setModal(true);
  };
  const toggleModalClose = () => {
    setModal(false);
    setProjectData({
      id: project?._id,
      title: project?.title,
      language: project?.language,
      overview: project?.overview,
      github: project?.github,
      website: project?.website,
      projectImage: "",
    });
    setPreview("");
  };

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      setPreview("");
    }
  }, [projectData.projectImage]);
  const handleUpdate = async () => {
    const { title, language, overview, github, website, projectImage } =
      projectData;
    if (!title || !language || !overview || !github || !website) {
      toast.error("Please fill all the fields");
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("language", language);
      formData.append("overview", overview);
      formData.append("github", github);
      formData.append("website", website);
      formData.append("project_image", projectImage);
      const token = sessionStorage.getItem("token");
      console.log(token)
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          Authorization: `Bearer ${token}`,
        };
        //api call
        try{
          const result = await editProjectAPI(projectData.id,formData,reqHeader)
          console.log(result)
          if(result.status == 200){
            toggleModalClose();
            setAddResponse(result);
            toast.success("Project updated successfully");
            //pass the response to view component using context api
          }
        }catch(e){console.log(e)}
      }
    }
  };
  return (
    <>
      <Button className="btn" onClick={toggleModalOpen}>
        Edit
      </Button>

      <Modal isOpen={modal} size="lg" toggle={toggleModalClose}>
        <ModalHeader toggle={toggleModalClose}>Project Details</ModalHeader>
        <ModalBody>
          <div className="d-flex">
            {/* Left Section for Image Upload */}
            <div className="me-3">
              <label>
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projectImage: e.target.files[0],
                    })
                  }
                />
                <img
                  style={{ height: "200px", cursor: "pointer" }}
                  className="img-fluid"
                  src={
                    preview
                      ? preview
                      : `${SERVER_URL}/uploads/${project?.projectImage}`
                  }
                  alt="Upload Preview"
                />
              </label>
            </div>

            {/* Right Section for Inputs */}
            <div style={{ flex: 2 }}>
              <FormGroup>
                <Input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => {
                    setProjectData({ ...projectData, title: e.target.value });
                  }}
                  id="projectTitle"
                  placeholder="Enter project title"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={projectData.language}
                  onChange={(e) => {
                    setProjectData({
                      ...projectData,
                      language: e.target.value,
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
                  value={projectData.github}
                  onChange={(e) => {
                    setProjectData({ ...projectData, github: e.target.value });
                  }}
                  id="githubLink"
                  placeholder="Enter GitHub link"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="url"
                  value={projectData.website}
                  onChange={(e) => {
                    setProjectData({ ...projectData, website: e.target.value });
                  }}
                  id="websiteLink"
                  placeholder="Enter website link"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  value={projectData.overview}
                  onChange={(e) => {
                    setProjectData({
                      ...projectData,
                      overview: e.target.value,
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
          <Button color="primary" onClick={handleUpdate}>
            Apply Changes
          </Button>
          <Button color="secondary" onClick={toggleModalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Edit;
