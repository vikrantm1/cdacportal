import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export const mainListItems = (
  <React.Fragment>
    <Link to="/Admin">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/Admin/FacultyRecords">
      <ListItemButton>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Faculty Records" />
      </ListItemButton>
    </Link>
    <Link to="/Admin/StudentRecords">
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Student Records" />
      </ListItemButton>
    </Link>
    <Link to="/">
      <ListItemButton
        onClick={() => {
          sessionStorage.setItem("user", null);
          localStorage.setItem("user", null);
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
