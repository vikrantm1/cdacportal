import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Paper,
  Radio,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { RadioGroup } from "react-radio-buttons";
import { useNavigate, useLocation } from "react-router-dom";
import Webcam from "react-webcam";

export default function StartQuiz() {
  let [question, setQuestion] = useState("");
  let [quesCount, setCount] = useState(0);
  let [option, setOption] = useState([]);
  let [quizid, setQuizId] = useState(0);
  let [score, setScore] = useState(0);
  let navigate = useNavigate();
  let user = sessionStorage.getItem("user");
  let quiz = JSON.parse(sessionStorage.getItem("quiz"));
  console.log(quiz);
  const lengthofquiz = quiz.queList.length;

  const location = useLocation();
  useEffect(() => {
    if (user === "null" || user === null) {
      toast.error("Login First!!");
      navigate("/");
    }
    quizid = quiz.queList[0].quizId;
    setQuizId(quizid);
    question = quiz.queList[quesCount].question;
    option = quiz.queList[quesCount].options;

    setOption(option);
    setCount(quesCount);
    setQuestion(question);
  }, []);
  if (user !== "null") {
    user = JSON.parse(sessionStorage.getItem("user"));
  }
  const submitAnswer = () => {
    let check = scoreCounter();
    console.log(quesCount);

    if (quesCount >= lengthofquiz) {
      toast.success("quiz ended");
      updateDB();
      sessionStorage.setItem("score", score);
      score = 0;
      setScore(score);
      
      sessionStorage.setItem("lengthofquiz", lengthofquiz);
      navigate("/Student/Congratulations");
      return;
    }

    console.log(check);
    if (check) {
      question = quiz.queList[quesCount].question;
      console.log(question);
      setCount(quesCount);
      setQuestion(question);
      option = quiz.queList[quesCount].options;
      setOption(option);
    }
  };
  const updateDB = async () => {
    let userid = user.portalId;

    await axios.post("http://localhost:8080/Student/AddScore", null, {
      params: {
        userid,
        quizid,
        score,
      },
    });
  };

  const scoreCounter = () => {
    for (let i = 0; i < 4; i++) {
      if (document.getElementById(i).checked) {
        quesCount = quesCount + 1;
        if (document.getElementById(i).value == "true") {
          score = score + 1;
          setScore(score);
        }

        document.getElementById(i).checked = false;
        return true;
      }
    }
    toast.error("Must select one option");
    return false;
  };

  return (
    <>
      <Grid align="center">
        <Row>
          <Paper
            elevation={10}
            style={{ height: "80vh", width: "800px", marginTop: "17px" }}
          >
            <div
              className="text-muted "
              style={{ font: "5px", marginLeft: "30px", marginBottom: "40px" }}
            >
              <div>
                <div
                  className="pt-2"
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    fontWeight: "bolder",
                    marginBottom: "10px",
                  }}
                >
                  {" "}
                  Question No. {quesCount + 1} of {lengthofquiz}
                </div>

                <div
                  className="display-1"
                  style={{
                    fontSize: "20px",
                    overflowWrap: "break-word",
                    fontWeight: "bold",
                  }}
                >
                  {question}
                </div>
              </div>
            </div>
            {option.map((item, i) => (
              <h1 style={{ marginBottom: "30px", marginLeft: "30px" }}>
                <label for={i}>
                  <Row>
                    <Col>
                      <label for={i}>
                        <input
                          id={i}
                          type="radio"
                          value={item.correct}
                          name="option"
                          required
                          style={{
                            width: "20px",
                            height: "20px",
                            marginTop: "9px",
                          }}
                        />
                      </label>
                    </Col>
                    <Col>
                      <Form>
                        <Form.Group className="mb-3">
                          <textarea
                            className="rounded-4 px-2"
                            value={item.optionString}
                            style={{ width: "45vw" }}
                            disabled
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </label>
              </h1>
            ))}
            <Grid align="right">
              <Button
                variant="contained"
                style={{ marginRight: "70px" }}
                onClick={submitAnswer}
              >
                Submit Answer
              </Button>
            </Grid>
            <Toaster position="top-center" reverseOrder={false} />
          </Paper>
          <Col className="pt-3 ">
            <Webcam className="rounded-2" sx={{ height: 398, width: 400 }} />
          </Col>
        </Row>
      </Grid>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
