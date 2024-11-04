import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import loginImage from "../assets/image/loginImage.jpg";
import { loginAPI, registerAPI } from "../services/allAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { tokenAuthContext } from "../contexts/TokenAuth";
function Auth({ insideRegister }) {
  const {isAuthorized, setIsAuthorized} = useContext(tokenAuthContext)
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userInput.username && userInput.email && userInput.email) {
      //api call
      try {
        const result = await registerAPI(userInput);
        console.log(result.status);
        if (result.status == 200) {
          toast.success(
            `Registration successfull ${result.data.username}.. please login to explore our website`
          );
          setUserInput((prevState) => ({
            ...prevState,
            username: "",
            email: "",
            password: "",
          }));
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("fill the  fields");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (userInput.password && userInput.email) {
      //api call
      try {
        const result = await loginAPI(userInput);
        console.log(result.status);
        if (result.status == 200) {
          toast.success(`Login Success`);
          sessionStorage.setItem(
            "existingUser",
            JSON.stringify(result.data.existingUser)
          );
          setIsAuthorized(true);
          sessionStorage.setItem("token", result.data.token);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("fill the  fields");
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-center">
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
            className="fw-bolder"
          >
            Back to Home
          </Link>
        </div>
        <Card className="mx-auto col-lg-4">
          <Row>
            <Col xs={12} md={12}>
              <CardBody>
                <CardTitle tag="h5">
                  {insideRegister ? (
                    <b style={{ fontSize: "1.5rem" }}>Register</b>
                  ) : (
                    <b style={{ fontSize: "1.5rem" }}>Login</b>
                  )}
                </CardTitle>
                <Form>
                  {insideRegister && (
                    <>
                      <Label for="username" className="">
                        User Name
                      </Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        className="mb-1"
                        placeholder="Enter your user name"
                        value={userInput.username}
                        onChange={handleChange}
                        required
                      />
                    </>
                  )}
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    className="mb-1"
                    id="email"
                    placeholder="Enter your email"
                    value={userInput.email}
                    onChange={handleChange}
                    required
                  />
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    className="mb-1"
                    id="password"
                    placeholder="Enter your password"
                    value={userInput.password}
                    onChange={handleChange}
                    required
                  />
                  {insideRegister ? (
                    <Button
                      onClick={handleRegister}
                      color="primary"
                      type="submit"
                      block
                    >
                      Sign Up
                    </Button>
                  ) : (
                    <button
                      className="btn btn-primary w-100 mb-2 mt-2"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  )}{" "}
                  <br />
                  {!insideRegister ? (
                    <>
                      New User Click here to{" "}
                      <Link to={"/register"}>Register</Link>
                    </>
                  ) : (
                    <>
                      Already have an account ? Click here to{" "}
                      <Link to={"/login"}>Login</Link>
                    </>
                  )}
                </Form>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default Auth;
