import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Paper } from "@mui/material";
import { Button, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function FacultyRecording() {
  let id;
  let user = sessionStorage.getItem("user");
  let [dis, setDis] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  let [img, setimg] = useState("https://i.ibb.co/bPzHL31/download.png");
  let navigate = useNavigate();
  useEffect(() => {
    if (user === "null" || user === null || user === undefined) {
      toast.error("Login First!!");
      navigate("/");
    }
  }, []);

  if (user !== "null" && user !== null && user !== undefined) {
    user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    id = user.portalId;
  }

  let uploadRec = async () => {
    var formData = new FormData();
    var moduleName = document.getElementById("subject");
    var date = document.getElementById("date");
    var recordingLink = document.getElementById("link");
    var topicName = document.getElementById("topic");

    // formData.append("moduleName", moduleName);
    // formData.append("date", date);
    // formData.append("recordingLink", recordingLink);
    // formData.append("topicName", topicName);

    await axios.post("http://localhost:8080/Faculty/AddRec", {
      body: {
        moduleName,
        recordingLink,
        topicName,
        id,
      },
    });
  };

  function createData(
    id,
    date,
    SubjectName,
    Title,
    RecordingLink,
    keyPasswowrd
  ) {
    return { id, date, SubjectName, Title, RecordingLink, keyPasswowrd };
  }

  const rows = [
    createData(
      0,
      "16 Mar, 2022",
      "Java",
      "day4",
      "https://us02web.zoom.us/rec/share/BGBuhlm9A0w-63xzur0hKFGM55u0QWN75t-vNCewsIwC4d_GXnFGe_-AMIUN3tk.4b3B5f5n5iigjQ2G",
      "+Nqk$9Pw"
    ),
  ];

  return (
    <>
      <Grid align="center">
        <Paper elevation={10} style={{ height: "500px", width: "500px" }}>
          {/* <Form style={{ fontWeight: "bold", width: "450px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date and Time</Form.Label>
              <Form.Control id="date" type="datetime-local" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                id="subject"
                type="text"
                placeholder="Enter Subject Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Title</Form.Label>
              <Form.Control id="topic" type="text" placeholder="Enter Title" />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Video Link</Form.Label>
              <Form.Control
                id="link"
                type="text"
                placeholder="Place Link here"
              />
            </Form.Group> */}
          <input type="text" id="subject" />
          <input type="date" id="date" />
          <input type="text" id="link" />
          <Button
            variant="primary"
            onClick={uploadRec}
            style={{ color: "Black" }}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
      <Grid align="center">
        <Paper
          elevation={10}
          style={{ width: "90vw", height: "500px", margin: "20px" }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Index</th>
                <th>Date</th>
                <th>Subject</th>
                <th>Title</th>
                <th>Video</th>
                <th>Password</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr>
                  <td>{row.id}</td>
                  <td>{row.date}</td>
                  <td>{row.SubjectName}</td>
                  <td>{row.Title}</td>
                  <td>{row.RecordingLink}</td>
                  <td>{row.keyPasswowrd}</td>
                  <td>
                    {" "}
                    <DeleteIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </Grid>
    </>
  );
}
