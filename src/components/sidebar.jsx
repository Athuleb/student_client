import React from "react";
import "../css/sidebar.css";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";

function Sidebar({ setActiveComponent }) {
  return (
    <>
      <div className="app-container">
        <CDBSidebar
          textColor="#333"
          backgroundColor="#deedfa"
          style={{ width: "100px", height: "100dvh" }}
        >
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Menu
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <CDBSidebarMenuItem
                icon="home"
                onClick={() => setActiveComponent("Home")}
              >
                Home
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem
                icon="list"
                onClick={() => setActiveComponent("StudentsList")}
              >
                Students List
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem
                icon="file-alt"
                onClick={() => setActiveComponent("ManageStudent")}
              >
                Manage Student
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem
                icon="chart-line"
                onClick={() => setActiveComponent("Statistic")}
              >
                Statistic
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </>
  );
}

export default Sidebar;
