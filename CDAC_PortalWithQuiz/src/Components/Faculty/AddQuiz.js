import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddQuiz() {
  let [sub, setSubject] = useState("");
  let user = JSON.parse(sessionStorage.getItem("user"));
  let email;
  let navigate = useNavigate();
  useEffect(() => {
    if (user === "null" || user === null || user === undefined) {
      toast.error("Login First!!");
      navigate("/");
    }
  }, []);

  if (user !== "null" && user !== null && user !== undefined) {
    email = user.email;
    user = JSON.parse(sessionStorage.getItem("user"));
  }
  let subjectHandler = (e) => {
    sub = e.target.value;
    console.log(sub);
    setSubject(sub);
  };
  async function createQuiz() {
    let resp = await axios.post(
      "http://localhost:8080/Faculty/CreateQuiz",
      null,
      {
        params: { sub, email },
      }
    );
    sessionStorage.setItem("subject", sub);
    navigate("/Faculty/AddQuestion");
  }
  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className="display-6 fw-bolder text-center">Create Quiz</div>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Toaster position="top-center" reverseOrder={false} />
          <Avatar sx={{ m: 1, bgcolor: "darkslategray" }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Subject
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={subjectHandler}
              margin="normal"
              fullWidth
              id="subject"
              label="Add Subject"
              name="subject"
              autoComplete="subject"
              autoFocus
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={createQuiz}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
