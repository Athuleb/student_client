import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import FetchData from '../services/FetchData';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  
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
  
  return (
    <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <Table bordered hover responsive striped='row' > 
      <thead className="sticky-top bg-light">
          <tr>
            <td>ID</td>
            <td>Profile photo</td>
            <td>Name</td>
            {/* <td>Last Name</td> */}
            <td>Register Number</td>
            <td>Email</td>
            <td>Course</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          {students.map((stud) => (
            <tr key={stud.id}>
              <td>{stud.stdId}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8000${stud.ProfileImage}`}
                  alt="Profile"
                  style={{ width: "20dvh", height: "20dvh" }}
                />
              </td>
              <td>{stud.FirstName+" "+stud.LastName}</td>
              {/* <td>{}</td> */}
              <td>{stud.Register}</td>
              <td>{stud.Email}</td>
              <td>{stud.Course}</td>
              <td>{stud.Score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentsList;
