import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  let [emaildis, setEmaildis] = useState(false);
  let [otpdis, setotpdis] = useState(true);
  let [newPassworddis, setNewPassworddis] = useState(true);

  let navigate = useNavigate();
  let email;
  let user = sessionStorage.getItem("user");
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
      } else navigate("/");
    }
  });

  const getOtp = async () => {
    email = document.getElementById("email").value;
    console.log(email);
    if (email == "" || email == null) {
      toast.error("Please enter a valid email address");
      return;
    }
    let resp = await axios.post(
      "http://localhost:8080/ForgetPasswordGenerateOtp",
      null,
      {
        params: {
          email,
        },
      }
    );
    console.log(email);
    console.log(resp.data);
    if (resp.data) {
      console.log(resp.data);
      toast.success("Otp sent Successfully");
      setEmaildis(true);
      setotpdis(false);
      return;
    }
    console.log(resp.data);
    toast.error("Please enter a Registered email");
    return;
  };

  const verifyOtp = async () => {
    let otp = document.getElementById("otp").value;
    let resp = await axios.post("http://localhost:8080/verifyOtp", null, {
      params: {
        email,
        otp,
      },
    });
    if (resp.data) {
      toast.success("Otp Verified Successfully");
      setotpdis(true);
      setNewPassworddis(false);
      return;
    }
    toast.error("Otp does not matched !!");
  };

  const updatePassword = async () => {
    let newPassword = document.getElementById("newPassword").value;
    email = document.getElementById("email").value;

    let resp = await axios.post("http://localhost:8080/updatePassword", null, {
      params: { newPassword, email },
    });
    if (resp.data) {
      toast.success("Password updated successfully, Please relogin");
      navigate("/");
      return;
    } else toast.error("Error Occured !");
  };

  const reset = () => {
    setotpdis(true);
    setNewPassworddis(true);
    setEmaildis(false);
  };

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
            CDAC Portal
          </span>
          <img
            height="100"
            width="100"
            src="https://i.ibb.co/cFypkmN/Daco-4066845.png"
          />
        </Toolbar>
      </AppBar>
      <Grid align="center">
        <Paper
          elevation={4}
          style={{ width: "450px", height: "75vh", marginTop: "120px" }}
        >
          <div className="pt-3">
            <Avatar style={{ background: "#1bbd7e" }}>
              <LockResetIcon />
            </Avatar>
          </div>
          <form>
            <h4 style={{ color: "#1bbd7e" }}>Reset Password</h4>

            <div>
              <TextField
                className="mt-4 w-75 "
                disabled={emaildis}
                id="email"
                label="Email"
              />
            </div>
            <div className="mt-3">
              <Button variant="contained" disabled={emaildis} onClick={getOtp}>
                Get Otp
              </Button>
            </div>
            <div>
              <TextField
                className="mt-4 w-25 "
                id="otp"
                label="Otp"
                disabled={otpdis}
              />
            </div>
            <div className="mt-3">
              <Button variant="contained" onClick={verifyOtp} disabled={otpdis}>
                Verify Otp
              </Button>
            </div>
            <div>
              <TextField
                className="mt-4 w-50 "
                type="password"
                id="newPassword"
                label="New Password"
                disabled={newPassworddis}
              />
            </div>
            <div className="my-3">
              <Button
                className="mx-3"
                variant="outlined"
                color="error"
                type="reset"
                onClick={reset}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={updatePassword}
                disabled={newPassworddis}
              >
                Update Password
              </Button>
            </div>
          </form>
          <Typography style={{ marginTop: "2px" }}>
            Go back to Login page
            <Link to={"/"}>
              <b className="text-info"> Click here</b>
            </Link>
          </Typography>
        </Paper>
        <Toaster position="top-center" reverseOrder={false} />
      </Grid>
    </>
  );
}
