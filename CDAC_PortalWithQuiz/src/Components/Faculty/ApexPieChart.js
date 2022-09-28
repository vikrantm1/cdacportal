import { Grid, Paper } from "@mui/material";
import Chart from "react-apexcharts";
import * as React from "react";
import axios from "axios";
export default function ApexPieChart(props) {
  let [countRecording, setCountRecording] = React.useState(0);
  let [countNote, setCountNote] = React.useState(0);
  let [countNotice, setCountNotice] = React.useState(0);
  let [countQuiz, setCountQuiz] = React.useState(0);

  let user = sessionStorage.getItem("user");

  React.useEffect(async () => {
    const resp1 = await axios.get(
      "http://localhost:8080/Faculty/dashboard?portalId=" + props.id
    );
    countQuiz = resp1.data.countQuiz;
    setCountQuiz(countQuiz);
    countNote = resp1.data.countNote;
    setCountNote(countNote);
    countNotice = resp1.data.countNotice;
    setCountNotice(countNotice);
    countRecording = resp1.data.countRecording;
    setCountRecording(countRecording);
  }, []);
  return (
    <>
      <Grid align="center">
        <Paper
          elevation={10}
          style={{ width: "600px", height: "50vh", marginTop: "100px" }}
        >
          <div className="pt-2 text-left">
            <Chart
              style={{ margin: "20px" }}
              type="pie"
              width={450}
              height={450}
              series={[countQuiz, countRecording, countNote, countNotice]}
              options={{
                labels: ["Quizzes", "Recordings", "Notes", "Notices"],
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "center",
                      },
                    },
                  },
                ],
              }}
            ></Chart>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
