import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar.jsx";
import StudentsList from "./components/StudentsList.jsx";
import ManageStudent from "./components/ManageStudent.jsx";
import Statistic from "./components/Statistic.jsx";

function App() {
  const [activeComponent, setActiveComponent] = useState(""); 
  
  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Home />;
      case "StudentsList":
        return <StudentsList />;
      case "ManageStudent":
        return <ManageStudent />;
      case "Statistic":
        return <Statistic />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="main">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="app-content">
        <div className="sidebar">
          <Sidebar setActiveComponent={setActiveComponent} />       
          </div>
        <div className="main-content">
          {renderComponent()} 
        </div>
      </div>
    </div>
  );
}

export default App;
