import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "../css/manage.css";
import FetchData from "../services/FetchData";
import UpdateStd from "../services/UpdateStd";
import AddStd from "../services/AddStd";
import DeleteStd from "../services/DeleteStd";

function ManageStudent() {
  const [showList, setShowList] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleShowList = () => {
    setShowList(!showList);
  };

  useEffect(() => {
    let mounted = true;

    const fetchStudents = async () => {
      try {
        const data = await FetchData();
        if (mounted) {
          setStudents(data);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();

    return () => {
      mounted = false;
    };
  }, []);

  // Show modal to add a new student
  const handleAdd = () => {
    setShowAddForm(true);
  };

  // Close modal for adding a student
  const handleCloseAdd = () => {
    setShowAddForm(false);
  };

  const handleUpdate = (studentId) => {
    setSelectedStudentId(studentId);
    setShowUpdateForm(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdateForm(false);
    setSelectedStudentId(null);
  };

  const handleDelete = async (e, studentId) => {
    e.preventDefault(); 
    if (window.confirm("Are you sure?")) {
      try {
        const response = await DeleteStd(studentId); 
        alert(response.message || "Student deleted successfully");
      } catch (error) {
        alert(error.message || "Something went wrong!");
      }
    }
  };
  

  return (
    <div>
      <div className="container">
        <h1>Manage Students</h1>
        <div className="show-list">
          <Button
            variant="outline-primary"
            onClick={handleShowList}
            className="m-1"
          >
            {showList ? "Hide List" : "Show List"}
          </Button>

          {showList && (
            <div className="table">
              <Table bordered hover responsive striped="row" variant="dark">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Profile photo</td>
                    <td>Name</td>
                    <td>Register Number</td>
                    <td>Email</td>
                    <td>Course</td>
                    <td>Score</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {students.map((stud) => (
                    <tr key={stud.stdId}>
                      <td>{stud.stdId}</td>
                      <td>
                        <img
                          src={`http://127.0.0.1:8000${stud.ProfileImage}`}
                          alt="Profile"
                          style={{ width: "20dvh", height: "20dvh" }}
                        />
                      </td>
                      <td>{stud.FirstName + " " + stud.LastName}</td>
                      <td>{stud.Register}</td>
                      <td>{stud.Email}</td>
                      <td>{stud.Course}</td>
                      <td>{stud.Score}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleUpdate(stud.stdId)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(e) => handleDelete(e,stud.stdId)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
      <Button variant="success" onClick={handleAdd} className="add-btn">
        Add Student
      </Button>
      <AddStd show={showAddForm} handleClose={handleCloseAdd} />

      {showUpdateForm && (
        <UpdateStd
          show={showUpdateForm}
          handleClose={handleCloseUpdate}
          studentId={selectedStudentId} // Pass the selected student's ID to the UpdateStd component
        />
      )}
    </div>
  );
}

export default ManageStudent;
