import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TableContainer,
  TextField,
} from "@mui/material";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewTabTest() {
  let id;
  let user = sessionStorage.getItem("user");
  let [rows, setRows] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user === "null" || user === null || user === undefined) {
      toast.error("Login First!!");
      navigate("/");
    }
  }, []);

  if (user !== "null" && user !== null && user !== undefined) {
    user = JSON.parse(sessionStorage.getItem("user"));
    id = user.portalId;
  }

  const deleteMaterial = async (e) => {
    console.log(e.target.value);
    let baseId = e.target.value;
    await axios.post("http://localhost:8080/Faculty/deleteMaterial", null, {
      params: { baseId },
    });
    let response = await axios.get(
      "http://localhost:8080/Faculty/getStudyMaterial"
    );
    rows = response.data;
    console.log(rows);
    setRows(rows);
  };
  React.useEffect(async () => {
    let response = await axios.get(
      "http://localhost:8080/Faculty/getStudyMaterial"
    );
    rows = response.data;
    console.log(rows);
    setRows(rows);
  }, []);
  let [disable, setDisable] = React.useState(false);
  const [height, setHeight] = React.useState();

  const getListSize = () => {
    let height = rows.length * 75 + "px";
    setHeight(height);
  };

  const upload = async (e) => {
    let file = document.getElementById("file").files[0];
    let moduleName = document.getElementById("moduleName").value;
    let topicName = document.getElementById("topicName").value;
    setDisable(true);
    console.log(file);
    let formdata = new FormData();
    formdata.append("file", file);

    let resp = await axios.post(
      "http://localhost:8080/Faculty/addStudyMaterial",
      formdata,
      {
        params: {
          id,
          moduleName,
          topicName,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    let response = await axios.get(
      "http://localhost:8080/Faculty/getStudyMaterial"
    );
    rows = response.data;
    console.log(rows);
    setRows(rows);

    if (resp.data) {
      toast.success("File Uploaded Successfullly");
      return;
    } else {
      toast.error("File upload Error !!");
    }
  };
  return (
    <>
      <Grid align="center">
        <Paper elevation={5} style={{ marginTop: "100px", width: "500px" }}>
          <div style={{ width: "500px" }}>
            <div className="pt-3">
              <Avatar style={{ background: "#1bbd7e" }}>
                <LibraryBooksIcon />
              </Avatar>
              <h4 style={{ color: "#1bbd7e" }}>Upload StudyMaterial</h4>
            </div>
            <TextField
              id="moduleName"
              label="Subject "
              variant="outlined"
              style={{ marginTop: "30px" }}
            />
            <div>
              <TextField
                id="topicName"
                label="Topic"
                variant="outlined"
                style={{ marginTop: "20px" }}
              />
            </div>
            <label htmlFor="contained-button-file">
              <div>
                <label className="text-dark m-3 fw-bold" for="file">
                  Select Material
                </label>
              </div>
              <input
                id="file"
                className="btn btn-success opacity-75"
                type="file"
                accept=".pdf,.doc"
              />
            </label>
            <div>
              <Button
                className="my-4"
                variant="contained"
                color="primary"
                disabled={disable}
                onClick={upload}
              >
                Upload
              </Button>
            </div>
          </div>
        </Paper>
        <Toaster position="top-center" reverseOrder={false} />
      </Grid>

      <Grid align="center">
        <Paper
          elevation={10}
          style={{ width: "700px", marginTop: "50px", height: height }}
        >
          <div className="p-3 text-center">
            <div>
              <TableContainer sx={{ maxheight: "20vh" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  striped
                  bordered
                  hover
                >
                  <thead className="alert-danger">
                    <tr>
                      <th>Topic</th>
                      <th>Date</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td>{rows[i].topicName}</td>
                        <td>{rows[i].uploadDate}</td>
                        <td>
                          <button
                            value={rows[i].baseId}
                            onClick={deleteMaterial}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
