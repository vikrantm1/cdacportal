import { BorderAllRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export default function Cards() {
  let [subList, setList] = useState([]);
  let navigate = useNavigate();
  useEffect(async () => {
    const resp = await axios.get(
      "http://localhost:8080/Student/DisplaySubjects"
    );

    subList = resp.data;
    setList(subList);
  }, []);
  const startQuiz = async (e) => {
    {
      console.log(e.target.value);
      let questionList = await axios.get(
        "http://localhost:8080/Student/getQuestionList?id=" + e.target.value
      );
      let questionList1 = questionList.data;
      console.log(questionList1);
      let question = {
        queList: questionList1,
        queCount: 0,
      };
      sessionStorage.setItem("quiz", JSON.stringify(question));
      console.log(e.target.value);
      console.log(questionList1);
      navigate("/Student/Quiz");
    }
  };
  return (
    <>
      <div className="display-6 fw-bolder text-center alert-success mb-4">
        Quiz Section
      </div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {subList.map((val) => (
          <Col>
            <div style={{ width: "260px" }}>
              <Card
                style={{ backgroundColor: "#dff6dd", border: "1px solid grey" }}
              >
                <Card.Body>
                  <Card.Text>
                    <div className="text-center text-dark fw-bold alert-danger rounded-2 p-2">
                      Quiz No.{val.quizId}
                    </div>
                  </Card.Text>

                  <Card.Title>
                    <h2 className="text-center display-xs-6 py-4 fw-bold">
                      {val.subject}
                    </h2>
                  </Card.Title>

                  <Card.Text>
                    <h4 className="">Created by - {val.facname}</h4>
                  </Card.Text>
                  <div className="pt-4"></div>
                  <Button
                    value={val.quizId}
                    variant="contained"
                    onClick={startQuiz}
                  >
                    Attempt Quiz
                  </Button>

                  <Card.Text>
                    <div className="py-2">
                      <br />
                      <hr />
                      <div className="text-muted">Created on - {val.date}</div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
