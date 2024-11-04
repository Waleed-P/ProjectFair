import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { tokenAuthContext } from "../contexts/TokenAuth";
function BasicExample() {
  const { isAuthorized, setIsAuthorized } = useContext(tokenAuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthorized(false);
    navigate("/");
  };
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#e83384" }}>
      <Container>
        <Navbar.Brand style={{ color: "white", fontWeight: "bolder" }}>
          Project Fair
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ color: "white" }}>
              <Link to={"/"}>Home</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout} style={{ color: "white" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
