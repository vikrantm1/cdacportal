import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  faThLarge,
  faUser,
  faExclamationTriangle,
  faBook,
  faSignOut,
  faVideo,
  faChess,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Cards from './Cards';
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Router, useNavigate } from "react-router-dom";
import DispChart from "./DispChart";
import Cards from "./Cards";
import ReactDOM from "react-dom";
import { Avatar } from "@mui/material";

export default function StudentDashboard() {
  const drawerWidth = 240;
  const navigate = useNavigate();
  let id;
  let user = sessionStorage.getItem("user");
  useEffect(() => {
    if (user === "null" || user === null || user === undefined) {
      toast.error("Login First!!");
      navigate("/");
    }
  });

  if (user !== "null" && user !== null && user !== undefined) {
    user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    id = user.portalId;
  }
  const signOut = () => {
    sessionStorage.setItem("user", null);
    localStorage.setItem("user", null);
    navigate("/");
  };
  const handleProfile = () => {
    navigate("/Studentprofile");
  };

  const handleDashboard = () => {
    navigate("/Student");
  };
  const redirectToQuiz = () => {
    navigate("/QuizList");
  };
  return (
    <>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <div>
              <Toolbar>
                <Typography variant="h4" noWrap>
                  Student DashBoard
                </Typography>
              </Toolbar>
            </div>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }} bgcolor="white" height={"100vh"}>
              <List style={{ marginTop: "30px" }}>
                <ListItem button onClick={handleDashboard}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faThLarge}
                      className="font"
                    ></FontAwesomeIcon>
                  </ListItemIcon>
                  <ListItemText primary="DashBoard" />
                </ListItem>
                <ListItem button onClick={handleProfile}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="font"
                    ></FontAwesomeIcon>
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <ListItem button onClick={redirectToQuiz}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faChess}
                      className="font"
                    ></FontAwesomeIcon>
                  </ListItemIcon>
                  <ListItemText primary="Quiz" />
                  <Toaster position="top-center" reverseOrder={false} />
                </ListItem>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <ListItem button>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="font"
                    ></FontAwesomeIcon>
                  </ListItemIcon>
                  <ListItemText primary="Notice" />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faBook}
                      className="font"
                    ></FontAwesomeIcon>
                  </ListItemIcon>
                  <ListItemText primary="Study Material" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="font"
                    ></FontAwesomeIcon>
                  </ListItemIcon>
                  <ListItemText primary="Recordings" />
                </ListItem>
                <ListItem button onClick={signOut}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faSignOut}
                      className="font"
                    ></FontAwesomeIcon>
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                  <Toaster position="top-center" reverseOrder={false} />
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
            <DispChart />
            <Avatar
              alt={user.name}
              src={"http://localhost:8080/getpropic?id=" + id}
              sx={{ width: 56, height: 56 }}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
