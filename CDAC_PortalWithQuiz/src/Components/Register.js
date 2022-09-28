import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "bootstrap";
import { MenuItem } from "@material-ui/core";

export default function Register() {
  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [nameErr, setNameErr] = useState(false);
  let [emailErr, setEmailErr] = useState(false);
  let [passErr, setPassErr] = useState(false);
  let [surErr, setSurErr] = useState(false);
  let resp;
  const digit = "[0-9]";
  const special = "[!@#$%^&*]";
  let user = sessionStorage.getItem("user");
  let navigate = useNavigate();
  let localstorage = localStorage.getItem("user");
  useEffect(() => {
    console.log(user);
    if (localstorage !== "null" && localstorage !== null) {
      user = sessionStorage.setItem("user", localstorage);
    }
    if (user !== "null" && user !== null) {
      user = JSON.parse(sessionStorage.getItem("user"));
      if (user.role == "admin") {
        navigate("/Admin");
      } else if (user.role == "student") {
        navigate("/Student");
      } else if (user.role == "faculty") {
        navigate("/faculty");
      }
    }
  });

  const usernameHandler = (e) => {
    name = e.target.value;
    setName(name);
  };
  const surnameHandler = (e) => {
    surname = e.target.value;
    setSurname(surname);
  };
  const useremailHandler = (e) => {
    email = e.target.value;

    setEmail(email);
  };

  const passwordHandler = (e) => {
    password = e.target.value;

    setPassword(password);
  };
  const roleHandler = (e) => {

    setRole(e.target.value);
  };

  function clearField() {
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
  }

  const fontStyle = {
    fontFamily: "Permanent Marker",
    color: "red",
    fontSize: "15px",
  };
  const paperStyle = {
    padding: "30px 20px",
    width: 350,
    height: "80vh",
    margin: "20px auto",
  };

  async function register() {

    if (
      name.length <= 3 ||
      name.length > 15 ||
      name == ""
    ) {
      toast.error("Name length should be 3 to 15 characters");
      return;
    }
    if (
      name.match(digit) ||
      name.match(special)
    ) {
      toast.error("Name should not contain any Special characters");
      return;
    }
    if (
      surname.match(digit) ||
      surname.match(special) ||
      surname.length > 10 ||
      surname == ""
    ) {
      toast.error("Name should not contain any Special characters");
      return;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      toast.error("Please enter valid email address");
      return;
    }
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    if (!password.match(passw)) {
      toast.error(
        "password must contain special character and should be between 7-14 characters"
      );
      return;
    }
    if (role == "") {
      toast.error("Must select a role");
      return;
    }
    resp = await axios.post("http://localhost:8080/register", {
      name: name,
      password: password,
      surname: surname,
      email: email,
      role: role,
      active: true,
    });
    if (resp.data == false) {
      toast.error("Email is already Registered");
      return;
    }
    toast.success("Registration Successfull !!");
    navigate("/");
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            bgcolor: "#1976D2",
            color: "white",
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <img
            src="https://ci4.googleusercontent.com/proxy/mta1h-3IY-hDdJj9bN6Xxr94NMwPShHjLGCpVtITeh4FONiEryzXYSNYP_LzrMwHQ3_cb2nMIgqmiU5CP19fa1Sy2j0KZMxl0M0waLHaKN98tADGF1qfHtzGANmMCpK0XTl3WFf0yhABxLFC4cg4CeU=s0-d-e1-ft#https://i.ibb.co/Z6qL3Qk/130835957-4769194336484775-8630394154285450578-n-removebg-preview.png"
            alt="Kitten"
            height="65"
            width="45"
          />
          <span
            className="multicolortext fw-bolder ml-3"
            style={{ fontSize: "35px" }}
          >
             CDAC Student Elearning Portal
          </span>
          {/* <img
            height="100"
            width="100"
            src="https://i.ibb.co/cFypkmN/Daco-4066845.png"
          /> */}
          {/* <Avatar
              
              
            /> */}
        </Toolbar>
      </AppBar>

      <Grid style={{ marginTop: "100px" }}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <PersonAddAlt1Icon />
            </Avatar>
            <h3 style={{ color: "#1bbd7e" }}> Sign Up </h3>
          </Grid>
          
          <TextField
            id="name"
            label="Name"
            type="text"
            onChange={usernameHandler}
            style={{ marginBottom: "10px", marginTop: "30px" }}
            autoComplete="off"
            fullWidth
          />
          <Toaster position="top-center" reverseOrder={false} />


          <TextField
            id="surname"
            label="Surname"
            type="text"
            onChange={surnameHandler}
            style={{ marginBottom: "10px" }}
            autoComplete="off"
            fullWidth
          /><br></br>
          Select Role: 
      <select selected name="Role" onChange={roleHandler} className="p-2  opacity-50">
            <option>---Select Role----</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
            {/* <option value="admin">Admin</option> */}
          </select>
          <TextField
            id="email"
            label="Email"
            type="email"
            onChange={useremailHandler}
            fullWidth
            style={{ marginBottom: "10px" }}
            autoComplete="off"
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={passwordHandler}
            fullWidth
            style={{ marginBottom: "15px" }}
            autoComplete="off"
          />


          <Button
            variant="contained"
            onClick={register}
            fullWidth
            style={{ marginBottom: "10px" }}
          >
            Register
          </Button>

          <Typography style={{ marginTop: "10px" }}>
            Already have an account?
            <Link to="/">
              <b className="text-info"> Sign in</b>
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}
