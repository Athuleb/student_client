
import axios from "axios"; 
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from 'react-bootstrap/Alert';

function AddStd({ show, handleClose }) {
  const [stdId, setStdId] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [register, setRegister] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(""); // Changed SetScore to setScore
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Optional: To handle loading state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");


  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Optional
    const formData = new FormData();
    formData.append("stdId", stdId);
    formData.append("FirstName", FirstName);
    formData.append("LastName", lastName);
    formData.append("Register", register);
    formData.append("Email", email);
    formData.append("Course", course);
    formData.append("ProfileImage", profileImage);
    formData.append("Score", score);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/std/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Student added successfully", response.data);
      alert(`student has been added successfully`)
      handleClose();
      setFirstName("");
      setLastName("");
      setRegister("");
      setEmail("");
      setCourse("");
      setScore("");
      setProfileImage(null);
      handleClose();
    } catch (error) {
      console.error("Error adding student:", error.response?.data || error);

      window.alert("Failed adding student");
      if (error.response) {

        console.error("Backend returned status:", error.response.status);
        console.error("Backend response data:", error.response.data);
        console.error("Backend response headers:", error.response.headers);
        window.alert(
          `Error: ${error.response.data.detail || "Failed adding student"}`
        );
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received from backend", error.request);
        window.alert("No response from server, please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error in setting up request:", error.message);
        window.alert("An error occurred while adding the student.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>


    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>student Id</Form.Label>
            <Form.Control
              type="number"
              value={stdId}
              onChange={(e) => setStdId(e.target.value)}
              required
            />
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRegister">
            <Form.Label>Register Number</Form.Label>
            <Form.Control
              type="number"
              value={register}
              onChange={(e) => setRegister(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCourse">
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCourse">
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProfileImage">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Student"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>

    </>

  );
}

export default AddStd;
