import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Paper } from "@mui/material";
import { Button, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentStudyMaterial() {
  let [rows, setRows] = useState([]);
  const [height, setHeight] = useState("");

  const getListSize = () => {
    let height = rows.length * 75 + "px";
    setHeight(height);
  };
  useEffect(async () => {
    let resp = await axios.get("http://localhost:8080/Student/StudyList");
    rows = resp.data;
    setRows(rows);
  }, []);

  const downloadFile = (e) => {
    let id = e.target.value;
    window.open("http://localhost:8080/Student/notes.pdf?id=" + id);
  };
  return (
    <>
      <div className="display-6 fw-bolder text-center">Notes Section</div>
      <Grid align="center">
        <Paper
          elevation={10}
          style={{ width: "700px", marginTop: "20px", height: height }}
        >
          <Table striped bordered hover>
            <thead>
              <tr align="center">
                <th>Subject</th>
                <th>Date</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr align="center">
                  <td>{rows[i].topicName}</td>
                  <td>{rows[i].uploadDate}</td>
                  <td>
                    <button
                      className="text-primary"
                      value={rows[i].baseId}
                      onClick={downloadFile}
                    >
                      Click Here to View
                    </button>
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
