import { Avatar, Grid, Paper } from "@mui/material";
import { borderRadius } from "@mui/system";
import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { SocialIcon } from "react-social-icons";

export default function ProfileCard(props) {
  var date = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  var time = new Date().toLocaleTimeString();
  var [ctime, setCtime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };
  setInterval(UpdateTime, 1000);
  var student = props.name;
  const cardStyle = { position: "absolute", top: "6rem", right: "2rem" };
  return (
    <div style={cardStyle}>
      <Grid align="center">
        <Paper
          elevation={5}
          style={{
            width: "250px",
            height: "240px",
            padding: "20px",
            bgcolor: "text.primary",
            borderRadius: 4,
          }}
        >
          <Avatar
            alt="Admin"
            src={
              "http://localhost:8080 "
              
            }
            sx={{ width: 75, height: 75 }}
          />
          <h5
            style={{
              marginTop: "5px",
              color: "blueviolet",
              fontWeight: "bold",
            }}
          >
            Admin
          </h5>
          <div style={{ fontWeight: " bold" }}>
            <span style={{ fontFamily: "sans-serif", color: "DodgerBlue" }}>
              Date :{"  "}
            </span>
            {date}
          </div>
          <div style={{ fontWeight: " bold" }}>
            <span style={{ fontFamily: "sans-serif", color: "DodgerBlue" }}>
              Time :{"  "}
            </span>
            {"  "}
            <span style={{ fontFamily: "sans-serif", color: "DogerBlue" }}>
              {time}
            </span>
            <div className="pl-3">
              <Grid container justify="left" spacing={2}>
                <Grid item>
                  <SocialIcon url="https://web.whatsapp.com/" />
                </Grid>
                <Grid item>
                  <SocialIcon url="https://github.com/" />
                </Grid>
                <Grid item>
                  <SocialIcon url="https://mail.google.com/" />
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}
