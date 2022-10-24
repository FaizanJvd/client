import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "200px" }}>
      <header
        style={{
          color: "#0231C9",
          marginTop: "1em",
          marginLeft: "1em",
          fontSize: "30px",
        }}
      >
        Menu
      </header>
      <hr style={{ color: "blue", height: "2px" }} />
      <div className="d-flex flex-column ">
        <NavLink to="/user">
          <label style={{fontSize:"20px",marginTop:"1em",marginLeft:"1em"}}>Add User</label>
        </NavLink>
        <hr style={{ color: "blue", height: "2px" }} />
        <NavLink to="/user/view">
          <label style={{fontSize:"20px",marginTop:"1em",marginLeft:"1em"}}>View Users</label>
        </NavLink>
        <hr style={{ color: "blue", height: "2px" }} />
        <NavLink to="/">
          <label style={{fontSize:"20px",marginTop:"20em",marginLeft:"1em"}}>Logout</label>
        </NavLink>

      </div>
      
    </div>
  );
};

export default Sidebar;
