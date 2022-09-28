import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import VideocamIcon from "@mui/icons-material/Videocam";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RecordingsUpload() {
  let id;
  let user = sessionStorage.getItem("user");
  const navigate = useNavigate();
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

  let [disable, setDisable] = useState(false);

  const upload = async (e) => {
    let file = document.getElementById("file").files[0];
    let moduleName = document.getElementById("moduleName").value;
    let topicName = document.getElementById("topicName").value;
    setDisable(true);
    console.log(file);
    let formdata = new FormData();

    formdata.append("videodetails", file);

    let resp = await axios.post(
      "http://localhost:8080/Faculty/AddRec",
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

    if (resp.data) {
      toast.success("Video Uploaded Successfullly");
      return;
    } else {
      toast.error("Video Error !!");
    }
    setDisable(false);
  };
  return (
    <Grid align="center">
      <Paper
        elevation={4}
        style={{ width: "450px", height: "70vh", marginTop: "70px" }}
      >
        <div className="pt-4">
          <Avatar style={{ background: "#1bbd7e" }}>
            <VideocamIcon />
          </Avatar>
        </div>
        <h4 className="pt-4" style={{ color: "#1bbd7e" }}>
          Upload Recordings
        </h4>
        <TextField
          id="moduleName"
          label="Module name"
          variant="outlined"
          style={{ marginTop: "50px" }}
        />
        <div>
          <TextField
            id="topicName"
            label="Topic name"
            variant="outlined"
            style={{ marginTop: "20px" }}
          />
        </div>
        <label htmlFor="contained-button-file">
          {/* <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          /> */}
          <div>
            <label className="text-dark m-2" for="file">
              Select Video
            </label>
          </div>
          <input id="file" className="btn btn-success" type="file" />
        </label>
        <div>
          <Button
            disabled={disable}
            className="m-2"
            variant="contained"
            onClick={upload}
            color="primary"
          >
            Upload
          </Button>
        </div>
      </Paper>
      <Toaster position="top-center" reverseOrder={false} />
    </Grid>
  );
}
