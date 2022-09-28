import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import QuizIcon from "@mui/icons-material/Quiz";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link, useNavigate } from "react-router-dom";
export const mainListItems = (
  <>
    <Link to="/Student">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/Student/Profile">
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
    <Link to="/Student/QuizList">
      <ListItemButton>
        <ListItemIcon>
          <QuizIcon />
        </ListItemIcon>
        <ListItemText primary="Quiz" />
      </ListItemButton>
    </Link>

    <Link to="/Student/Notice">
      <ListItemButton>
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary="Notice" />
      </ListItemButton>
    </Link>
    <Link to="/Student/StudyMaterial">
      <ListItemButton>
        <ListItemIcon>
          <TextSnippetIcon />
        </ListItemIcon>
        <ListItemText primary="Study Material" />
      </ListItemButton>
    </Link>
    <Link to="/Student/viewRecordings">
      <ListItemButton>
        <ListItemIcon>
          <EmergencyRecordingIcon />
        </ListItemIcon>
        <ListItemText primary=" Recordings" />
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
  </>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
