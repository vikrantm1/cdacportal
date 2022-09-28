import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Row, Table } from "react-bootstrap";
import { Grid } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function RecordingsList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    console.log(e.target.value);
    setVidId(e.target.value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  let [recordList, setRecordList] = React.useState([]);
  let [vidId, setVidId] = React.useState("");

  React.useEffect(async () => {
    let response = await axios.get("http://localhost:8080/Student/VideoList");
    setRecordList(response.data);
    console.log(response.data);
  }, []);

  return (
    <>
      <div className="display-6 fw-bolder text-center  mb-4">
        Recordings Section
      </div>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Table striped bordered hover style={{ width: "500px" }} align="center">
            <thead>
              <tr>
                <th>Subject</th>

                <th>Document</th>
                <th>Date</th>
                <th>Videos</th>
              </tr>
            </thead>
            <tbody>
              {recordList.map((item, i) => (
                <>
                  <tr>
                    <td>{item.moduleName}</td>
                    <td>{item.topicName}</td>
                    <td>{item.uploadDate}</td>

                    <td>
                      <Button value={item.objectId} onClick={handleOpen}>
                        Play recording
                      </Button>
                    </td>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <video
                          src={
                            `http://localhost:8080/Student/videoView?id=` +
                            vidId
                          }
                          controls
                          height="20"
                          width="400"
                        ></video>
                      </Box>
                    </Modal>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
          {/* <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {recordList.map((item, i) => (
              <div >
                <video
                  src={
                    `http://localhost:8080/Student/videoView?id=` +
                    item.objectId
                  }
                  controls
                height="20"
                  width="400"
                ></video>
              </div>
            ))}
          </Row> */}
        </Grid>
      </Grid>
    </>
  );
}
