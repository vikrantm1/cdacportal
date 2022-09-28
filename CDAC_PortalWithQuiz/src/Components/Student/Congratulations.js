import { Grid, Paper } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Congratulations(props) {
  let count = sessionStorage.getItem("score");
  let lengthofquiz = sessionStorage.getItem("lengthofquiz");
  const color1 = "#0066ff";
  const color2 = "#ff99cc";
  const navigate = useNavigate();
  if (count == "" || count == null || count == undefined) {
    navigate("/Student");
  }
  let result = "";
  let count2 = parseFloat(count);

  let lengthofquiz1 = parseFloat(lengthofquiz);
  if (count2 / lengthofquiz1 > 0.5) {
    result = "Congratulations";
  } else result = "Better Luck Next time";

  return (
    <Grid align="center">
      <Paper
        elevation={10}
        style={{
          height: "75vh",
          width: "50vw",

          fontSize: "30px",
          marginTop: "30px",
          padding: "80px",
          color: "white",
          background: `linear-gradient(to bottom left,  ${color1} 0%,${color2} 100%)`,
        }}
      >
        {(count2 / lengthofquiz1) * 100 > 50 ? (
          <div style={{ fontSize: "100px" }}> 🎉 </div>
        ) : (
          <div style={{ fontSize: "100px" }}>😞</div>
        )}

        <div
          style={{
            fontSize: "45px",

            marginBottom: "50px",
            fontFamily: "cursive",
          }}
        >
          {result} <br />
          <div
            style={{
              fontFamily: "cursive",
              overflowWrap: "break-word",
              color: "white",
            }}
          >
            You have Scored: {count}/ {lengthofquiz}
          </div>
        </div>
      </Paper>
    </Grid>
  );
}
