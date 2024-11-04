import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/image/programmer_v_02.png";
import ProjectCard from "../components/ProjectCard";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import "../assets/css/home.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getHomeProjectsAPI } from "../services/allAPI";
import { Toaster } from "react-hot-toast";
function Home() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const [homeProjects, setHomeProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const result = await getHomeProjectsAPI();
      if (result.status == 200) {
        setHomeProjects(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProjects();
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);
  const handleProjects = () => {
    if (loginStatus) {
      navigate("/projects");
    } else {
      toast.error("Please login see more projects");
    }
  };
  return (
    <>
      {/* landing  */}
      <div
        style={{ minHeight: "100vh" }}
        className="w-100 d-flex align-items-center justify-content-center"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>
                <i class="fa-brands fa-docker"></i>
                Project Fair
              </h1>
              <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
                quidem, sequi aspernatur rem laborum ut! Ipsum, corrupti.
                Mollitia eius vitae totam architecto temporibus harum illo, ut
                provident perspiciatis facilis deleniti.
              </p>
              {loginStatus ? (
                <Link to={"/dashboard"} className="btn btn-primary">
                  Manage your projects
                </Link>
              ) : (
                <Link to={"/login"} className="btn btn-primary">
                  Starts to explore
                </Link>
              )}
            </div>
            <div className="col-lg-6">
              <img src={image} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* projects  */}
      <div className="mt-5">
        <h1 className="text-center mb-5">Explore our projects</h1>
        <marquee>
          <div className="d-flex">
            {homeProjects?.length > 0 &&
              homeProjects?.map((project) => (
                <div key={project} className="me-5">
                  <ProjectCard displayData={project} />
                </div>
              ))}
          </div>
        </marquee>
        <div className="text-center">
          <button onClick={handleProjects} className="btn btn-link">
            Click here to view more projects....
          </button>
        </div>
      </div>
      {/* testimony  */}
      <div className="d-flex justify-content-center align-items-center mb-5 flex-column">
        <h1>Our Testimonials</h1>
        <div
          style={{ width: "100%" }}
          className="d-flex align-items-center justify-content-evenly"
        >
          <Card className="testimonial-card">
            <div className="text-center">
              {" "}
              {/* Centering the image and text */}
              <img
                alt="User"
                className="rounded-image"
                src="https://picsum.photos/100/100"
              />
            </div>
            <CardBody>
              <CardTitle tag="h5" className="user-name">
                Waleed
              </CardTitle>
              <div className="star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="testimonial-description">
                "This product changed my life! I can't recommend it enough. The
                quality is amazing and the customer service is top-notch."
              </p>
            </CardBody>
          </Card>
          <Card className="testimonial-card">
            <div className="text-center">
              {" "}
              {/* Centering the image and text */}
              <img
                alt="User"
                className="rounded-image"
                src="https://picsum.photos/100/100"
              />
            </div>
            <CardBody>
              <CardTitle tag="h5" className="user-name">
                Shahim
              </CardTitle>
              <div className="star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="testimonial-description">
                I’m so glad I decided to try this product! It exceeded all my
                expectations with its outstanding quality.
              </p>
            </CardBody>
          </Card>
          <Card className="testimonial-card">
            <div className="text-center">
              {" "}
              {/* Centering the image and text */}
              <img
                alt="User"
                className="rounded-image"
                src="https://picsum.photos/100/100"
              />
            </div>
            <CardBody>
              <CardTitle tag="h5" className="user-name">
                Shamseer
              </CardTitle>
              <div className="star-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="testimonial-description">
                This product has truly transformed my daily routine! I can't
                express how much I appreciate its quality and functionality.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
