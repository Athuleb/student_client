// src/components/Statistic.jsx
import React, { useEffect, useState } from 'react';
import FetchData from '../services/FetchData'; // Import the FetchData function

function Statistic() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageScore: 0,
    courseDistribution: {},
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const studentsData = await FetchData(); // Fetch data from API
        // Process the data to calculate required statistics
        const totalStudents = studentsData.length; // Assuming studentsData is an array
        const averageScore = studentsData.reduce((sum, student) => sum + student.score, 0) / totalStudents || 0;

        // Calculate course distribution
        const courseDistribution = studentsData.reduce((acc, student) => {
          acc[student.course] = (acc[student.course] || 0) + 1; // Increment count for each course
          return acc;
        }, {});

        setStats({ totalStudents, averageScore, courseDistribution });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div>
      <h2>Statistics Page</h2>
      <p>Total Students: {stats.totalStudents}</p>
      <p>Average Score: {stats.averageScore.toFixed(2)}</p>
      <h3>Course Distribution</h3>
      <ul>
        {Object.entries(stats.courseDistribution).map(([course, count]) => (
          <li key={course}>{course}: {count} students</li>
        ))}
      </ul>
    </div>
  );
}

export default Statistic;
