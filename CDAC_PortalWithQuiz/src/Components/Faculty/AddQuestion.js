import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

export default function AddQuestion() {
  let [option, setoptionject] = useState("");
  let question;
  let navigate = useNavigate();
  let subject = sessionStorage.getItem("subject");
  let user = JSON.parse(sessionStorage.getItem("user"));
  let optionVal = [];
  let questionCount;
  let checkedbtn;
  let email;
  console.log(subject);
  useEffect(() => {
    console.log(subject);
    if (user === "null" || user === null || user === undefined) {
      toast.error("Login First!!");
      navigate("/");
    } else if (subject == "null" || subject === null) {
      toast.error("Add subject First !!");
      navigate("/AddQuiz");
    }
  }, []);

  if (user !== "null" && user !== null && user !== undefined) {
    user = JSON.parse(sessionStorage.getItem("user"));
    email = user.email;
  }

  //////////////////////////////////////////////////////////////////////////

  const submit1 = async () => {
    if (document.getElementById("AddQuestion").value == "") {
      toast.error("Please add question");
      return;
    }
    for (let i = 1; i < 5; i++) {
      let intxt = document.getElementById("Option" + i).value;
      if (intxt == "" || intxt == null) {
        toast.error("All fields are required!!");
        return;
      }
    }
    let btn = document.getElementsByName("option1");
    if (!btn[1].disabled) {
      toast.error("Please check an option");
      return;
    }
    console.log(checkedbtn);
    let options = [false, false, false, false];
    let option = [];
    for (let i = 1; i < 5; i++) {
      option[i - 1] = document.getElementById("Option" + i).value;
      console.log(option[i - 1]);
      console.log(option[i - 1]);
    }
    options[checkedbtn - 1] = true;
    question = document.getElementById("AddQuestion").value;
    let resp = await axios.post("http://localhost:8080/Faculty/AddQuestion", {
      subject,
      question,
      optionlist: [
        { optionString: option[0], correct: options[0] },
        { optionString: option[1], correct: options[1] },
        { optionString: option[2], correct: options[2] },
        { optionString: option[3], correct: options[3] },
      ],
    });
    toast.success("Quiz Added Successfully !!");
    sessionStorage.setItem("subject", null);
    navigate("/Faculty");
  };
  const disablebtn = (e) => {
    for (let i = 1; i < 5; i++) {
      let btn = document.getElementsByName("option" + i);
      if (!btn[0].checked) {
        btn[0].disabled = true;
      }
      if (!btn[1].checked) {
        btn[1].disabled = true;
      }
    }
    checkedbtn = e.target.value;
  };
  const reset = () => {
    for (let i = 1; i < 5; i++) {
      let btn = document.getElementsByName("option" + i);
      btn[0].disabled = false;
      btn[0].checked = false;
      btn[1].disabled = false;
      btn[1].checked = false;
    }
  };

  const submit = async () => {
    if (document.getElementById("AddQuestion").value == "") {
      toast.error("Please add question");
      return;
    }
    for (let i = 1; i < 5; i++) {
      let intxt = document.getElementById("Option" + i).value;
      if (intxt == "" || intxt == null) {
        toast.error("All fields are required!!");
        return;
      }
    }
    let btn = document.getElementsByName("option1");
    if (!btn[1].disabled) {
      toast.error("Please check an option");
      return;
    }
    console.log(checkedbtn);
    let options = [false, false, false, false];
    let option = [];
    for (let i = 1; i < 5; i++) {
      option[i - 1] = document.getElementById("Option" + i).value;
    }
    options[checkedbtn - 1] = true;
    question = document.getElementById("AddQuestion").value;
    let resp = await axios.post("http://localhost:8080/Faculty/AddQuestion", {
      subject,
      question,
      optionlist: [
        { optionString: option[0], correct: options[0] },
        { optionString: option[1], correct: options[1] },
        { optionString: option[2], correct: options[2] },
        { optionString: option[3], correct: options[3] },
      ],
    });
    toast.success("Question Added");
    document.getElementById("resbtn").click();
  };

  const useStyle = makeStyles((theme) => ({
    textField: { Width: "900px" },
  }));
  const classes = useStyle();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <HelpOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Question
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            className={classes.textField}
            margin="normal"
            required
            fullWidth
            id="AddQuestion"
            label="Add Question"
            name="Add Question"
            autoComplete="Add Question"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Option1"
            label="Option1"
            name="Option1"
            autoComplete="Option1"
            autoFocus
          />
          <label>
            <input type="radio" onClick={disablebtn} value="1" name="option1" />
            Correct
          </label>
          <label>
            <input type="radio" onClick={disablebtn} value="0" name="option1" />
            Wrong
          </label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Option2"
            label="Option2"
            name="Option2"
            autoComplete="Option2"
            autoFocus
          />
          <label>
            <input type="radio" onClick={disablebtn} value="2" name="option2" />
            Correct
          </label>
          <label>
            <input type="radio" onClick={disablebtn} value="0" name="option2" />
            Wrong
          </label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Option3"
            label="Option3"
            name="Option3"
            autoComplete="Option3"
            autoFocus
          />
          <label>
            <input type="radio" onClick={disablebtn} value="3" name="option3" />
            Correct
          </label>
          <label>
            <input type="radio" onClick={disablebtn} value="0" name="option3" />
            Wrong
          </label>
          <TextField
            margin="normal"
            required
            fullWidth
            name="Option4"
            label="Option4"
            type="Option4"
            id="Option4"
            autoComplete="Add Question"
          />
          <label>
            <input type="radio" onClick={disablebtn} value="4" name="option4" />
            Correct
          </label>
          <label>
            <input type="radio" onClick={disablebtn} value="0" name="option4" />
            Wrong
          </label>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submit}
            >
              Add Question
            </Button>
            <Button
              type="reset"
              id="resbtn"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={reset}
            >
              Reset
            </Button>
            <Button
              type="button"
              color="success"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submit1}
            >
              Create Quiz
            </Button>
          </div>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
}
