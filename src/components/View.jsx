import React, { useContext, useEffect, useState } from "react";
import Edit from "./Edit";
import Add from "./Add";
import { getUserProjectsAPI, removeProjectAPI } from "../services/allAPI";
import { addResponseContext } from "../contexts/ContextAPI";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
function View() {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  useEffect(() => {
    fetchUserProjects();
  }, [addResponse]);
  const [userProjects, setUserProjects] = useState([]);

  const fetchUserProjects = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const result = await getUserProjectsAPI(reqHeader);
        console.log(result.data);
        if (result.status == 200) {
          setUserProjects(result.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteProject= async(id)=>{
    const token = sessionStorage.getItem("token");
    if(token){
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await removeProjectAPI(id,reqHeader)
      if(result.status == 200){
        toast.success("Project deleted successfully");
        fetchUserProjects();
      }
    }
  }
  return (
    <div>
      <div className="d-flex justify-content-between w-100">
        <h2 className="text-warning">All projects</h2>
        <button className="btn">
          <Add />
        </button>
      </div>
      <div className="mt-4">
        {userProjects?.length > 0 ? (
          userProjects?.map((project) => (
            <div
              key={project}
              className="d-flex justify-content-between border p-2 rounded"
            >
              <h3>{project?.title}</h3>
              <div className="icons d-flex">
                <div className="btn">
                  <Edit project={project} />
                </div>
                <a href={project.github} target="_blank" className="btn">
                  <i className="fa-brands fa-github"></i>
                </a>
                <button className="btn" onClick={()=>{handleDeleteProject(project?._id)}}>
                  <i className="fa-solid fa-trash text-danger"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="fw-bolder text-warning">
            No projects uploaded yet !!!
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
