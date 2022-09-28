import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Paper } from "@mui/material";
import { Button, Card, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { rgbToHex } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NoticeBoard() {
  let [rows, setRows] = useState([]);

  function createData(SubjectName, date, Doc) {
    return { SubjectName, date, Doc };
  }
  useEffect(async () => {
    let resp = await axios.get(
      "http://localhost:8080/Student/getNotice?" + global.Date.now()
    );
    rows = resp.data;
    console.log(rows);
    setRows(rows.reverse());
  }, []);

  return (
    <>
      <Grid align="center">
        <Paper elevation={10}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="display-5 ">Notice Board</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr>
                  <td
                    style={{
                      backgroundColor: "rgb(239, 239, 245)",
                      borderRadius: "20px,",
                    }}
                  >
                    <Card class="rounded" style={{ width: "100%" }}>
                      <Card.Body>
                        <Card.Title>{rows[i].subject}</Card.Title>
                        <Card.Text>{rows[i].notice}</Card.Text>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem className="text-muted">
                          {rows[i].uploadDate + "   "} Published by-{" "}
                          {rows[i].user.name}
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
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
