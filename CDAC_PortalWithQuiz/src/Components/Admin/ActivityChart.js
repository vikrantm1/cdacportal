import { Grid, Paper } from "@mui/material";
import Chart from "react-apexcharts";
import * as React from "react";
import axios from "axios";

export default function ActivityChart(props) {
  let [countRecording, setCountRecording] = React.useState(0);
  let [countNote, setCountNote] = React.useState(0);
  let [countStudent, setCountStudent] = React.useState(0);
  let [countFaculty, setCountFaculty] = React.useState(0);

  React.useEffect(async () => {
    const resp1 = await axios.get("http://localhost:8080/Admin/getDashdetails");
    countStudent = resp1.data.countstudent;
    setCountStudent(countStudent);
    countNote = resp1.data.countstudymatrial;
    setCountNote(countNote);
    countFaculty = resp1.data.countfaculty;
    setCountFaculty(countFaculty);
    countRecording = resp1.data.countrecordings;
    setCountRecording(countRecording);
  }, []);
  return (
    <>
      <Grid align="center">
        <div className="display-6 fw-bolder text-center">Portal Status</div>
        <Paper
          elevation={10}
          style={{ width: "550px", height: "50vh", marginTop: "40px" }}
        >
          <div className="pt-2">
            <Chart
              className="text-left"
              style={{ margin: "20px" }}
              type="donut"
              width={450}
              height={450}
              series={[countFaculty, countRecording, countStudent, countNote]}
              options={{
                labels: [
                  "Faculty Registered",
                  "Recordings",
                  "Students Registered",
                  "Notices",
                ],
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
