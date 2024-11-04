import React, { useState } from "react";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
  CardText
} from "reactstrap";
import { SERVER_URL } from "../services/serverUrl";

function ProjectCard({displayData}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Card onClick={toggle} style={{ width: "18rem" }}>
        <img alt="Sample" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} />
        <CardBody>
          <CardTitle tag="h5">{displayData?.title}</CardTitle>
          <CardSubtitle className="mb-1 text-muted" tag="h6">
            Languages : {displayData?.language}
          </CardSubtitle>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Project Details</ModalHeader>
        <ModalBody>
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                alt="Project Illustration"
                src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} // Replace with your project image
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <h5>{displayData?.title}</h5>
              <p>
                <strong>Languages Used:</strong> {displayData?.language}
              </p>
              <p>
                <strong>Overview:</strong> {displayData?.overview}
              </p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex gap-2">
            <Button
              color="primary"
              href={displayData?.github}
              target="_blank"
            >
              <i class="fa-brands fa-github"></i>{" "}
            </Button>
            <Button
              color="primary"
              href={displayData?.website}
              target="_blank"
            >
              <i className="fa fa-link"></i>
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ProjectCard;
