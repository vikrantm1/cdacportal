import { Button, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import useForceUpdate from "use-force-update";

export default function FacultyList() {
  let [list, setList] = useState([]);
  let [isLoad, setIsload] = useState([]);

  useEffect(async () => {
    let response = await axios.get(
      "http://localhost:8080/Admin/getFacultyList"
    );
    list = response.data;
    // console.log(list);
    setList(list);
  }, []);

  const disableAcc = async (e) => {
    let id = e.target.value;

    await axios.post("http://localhost:8080/Admin/disableAcc", null, {
      params: { id },
    });
    let response = await axios.get(
      "http://localhost:8080/Admin/getFacultyList"
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
      "http://localhost:8080/Admin/getFacultyList"
    );
    list = response.data;
    setList(list);
  };
  const [height, setHeight] = useState("");

  const getListSize = () => {
    let height = list.length * 75 + "px";
    setHeight(height);
  };

  return (
    <>
      <Grid align="center">
        <div className="display-6 fw-bolder text-center">Manage Faculty Accounts</div>
        <Paper
          elevation={10}
          style={{ width: "700px", marginTop: "40px", height: height }}
        >
          <div className="p-3">
            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>SurName</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {list.map((row, i) => (
                  <tr>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.surname}</td>
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
                        className="mx-2"
                        variant="contained"
                        color="error"
                        id={"d" + row.portalId}
                        value={row.portalId}
                        type="button"
                        onClick={(e) => {
                          disableAcc(e);
                        }}
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
