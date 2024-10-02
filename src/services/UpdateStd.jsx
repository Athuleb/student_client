import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function UpdateStd({ show, handleClose, studentId }) {
  const [FirstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [register, setRegister] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [score, setScore] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch the student's current data when the modal opens
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/std/${studentId}`);
        const student = response.data;
        setFirstName(student.FirstName);
        setLastName(student.LastName);
        setRegister(student.Register);
        setEmail(student.Email);
        setCourse(student.Course);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("LastName", lastName);
    formData.append("Register", register);
    formData.append("Email", email);
    formData.append("Course", course);
    formData.append("Score", score);
    if (profileImage) {
      formData.append("ProfileImage", profileImage);
    }

    try {
      await axios.put(`http://127.0.0.1:8000/std/${studentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Student updated successfully");
      window.alert("Student updated successfull")
      handleClose();
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formFirstName">
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
              placeholder="Enter Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Student"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdateStd;
