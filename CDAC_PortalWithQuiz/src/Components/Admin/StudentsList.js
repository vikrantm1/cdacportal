import { Button, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function StudentsList() {
  let [list, setList] = useState([]);

  useEffect(async () => {
    let response = await axios.get(
      "http://localhost:8080/Admin/getStudentList"
    );
    list = response.data;
    console.log(list);
    setList(list);
  }, []);

  const [height, setHeight] = useState("");

  const getListSize = () => {
    let height = list.length * 75 + "px";
    setHeight(height);
  };

  const disableAcc = async (e) => {
    let id = e.target.value;

    await axios.post("http://localhost:8080/Admin/disableAcc", null, {
      params: { id },
    });
    let response = await axios.get(
      "http://localhost:8080/Admin/getStudentList"
    );
    list = response.data;
    setList(list);
  };

  const enableAcc = async (e) => {
    let id = e.target.value;
    await axios.post("http://localhost:8080/Admin/enableAcc", null, {
      params: { id },
    });
    let response = await axios.get(
      "http://localhost:8080/Admin/getStudentList"
    );
    list = response.data;
    setList(list);
  };
  return (
    <>
      <Grid align="center">
        <div className="display-6 fw-bolder text-center">
          Manage Student Accounts
        </div>
        <Paper
          elevation={10}
          style={{ width: "700px", marginTop: "40px", height: height }}
        >
          <div className="p-3">
            <Table striped bordered hover>
              <thead className="text-center">
                <tr className="text-center">
                  <th>Name</th>
                  <th>SurName</th>
                  <th>Email</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {list.map((row, i) => (
                  <tr>
                    <td>{row.name}</td>
                    <td>{row.surname}</td>
                    <td>{row.email}</td>
                  

                    <td>
                      {
                        <Button
                          variant="contained"
                          color="primary"
                          id={"e" + row.portalId}
                          value={row.portalId}
                          type="button"
                          onClick={enableAcc}
                          disabled={row.active}
                        >
                          Enable
                        </Button>
                      }
                      <Button
                        className="m-2"
                        variant="contained"
                        color="error"
                        id={"d" + row.portalId}
                        value={row.portalId}
                        type="button"
                        onClick={disableAcc}
                        disabled={!row.active}
                      >
                        Disable
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
