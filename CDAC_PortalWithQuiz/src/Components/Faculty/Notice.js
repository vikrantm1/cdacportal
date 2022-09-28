import { Button, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  let id;
  let user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const [dis, setDis] = useState(false);
  useEffect(() => {
    if (user === "null" || user === null || user === undefined) {
      toast.error("Login First!!");
      navigate("/");
    }
  }, []);

  if (user !== "null" && user !== null && user !== undefined) {
    user = JSON.parse(sessionStorage.getItem("user"));

    id = user.portalId;
  }
  const sendNotice = async () => {
    setDis(true);
    let subject = document.getElementById("subject").value;
    let notice = document.getElementById("notice").value;
    await axios.post("http://localhost:8080/Faculty/Notices", null, {
      params: { id, subject, notice },
    });

    toast.success("Notice Broadcasted 👍");
  };

  const sendPriorityNotice = async () => {
    setDis(true);
    let subject = document.getElementById("subject").value;
    let notice = document.getElementById("notice").value;
    await axios.post("http://localhost:8080/Faculty/PrioNotices", null, {
      params: { id, subject, notice },
    });

    toast.success("Notice Broadcasted 👍");
  };

  const reset = () => {};

  return (
    <>
      <Paper elevation={10} style={{ width: "60%", height: "45vh" }}>
        <Form disabled={dis}>
          <Row>
            <Col style={{ marginLeft: "50px", fontWeight: "bolder" }}>
              <Form.Group className="mb-3" controlId="formBasicNotice">
                <div className="pt-3">
                  <Form.Label>Subject </Form.Label>
                </div>
                <Form.Control
                  id="subject"
                  type="text"
                  disabled={dis}
                  placeholder="Enter Notice type"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  id="notice"
                  disabled={dis}
                  style={{ paddingBottom: "120px" }}
                  type="text"
                  placeholder="Enter Message here"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                onClick={sendNotice}
                disabled={dis}
                style={{
                  width: "60%",
                  marginBottom: "30px",
                  marginTop: "50px",
                }}
                variant="contained"
              >
                Send Notice
              </Button>
              <Button
                onClick={sendPriorityNotice}
                disabled={dis}
                style={{ width: "60%", marginBottom: "30px" }}
                variant="contained"
                color="success"
              >
                Priority Notice
              </Button>
              <Button
                onClick={reset}
                style={{ width: "60%" }}
                variant="outlined"
                color="error"
                type="reset"
                onClick={() => {
                  setDis(false);
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Paper>
    </>
  );
}
