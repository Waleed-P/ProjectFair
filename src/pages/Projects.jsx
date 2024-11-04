import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import { getAllProjectsAPI } from "../services/allAPI";
import { Row , Col } from "reactstrap";
function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [searchKey,setSearchKey]=useState("");
  useEffect(() => {
    fetchAllProjects();
  }, [searchKey]);
  const fetchAllProjects = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const result = await getAllProjectsAPI(searchKey,reqHeader);
        console.log(result.data);
        if (result.status == 200) {
          setAllProjects(result.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }} className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All projects</h1>
          <input
            type="text"
            placeholder="Search project by langage used"
            className="form-control w-25"
            onChange={(e)=>{setSearchKey(e.target.value)}}
          />
        </div>
        <Row className="mt-3">
          {allProjects?.length > 0 ? (
            allProjects?.map((project) => (
              <Col className="mb-3" sm={12} md={6} lg={4}>
                <ProjectCard displayData={project}/>
              </Col>
            ))
          ) : (
            <div className="fw-bolder text-danger m-5 text-center"></div>
          )}
        </Row>
      </div>
    </>
  );
}

export default Projects;
