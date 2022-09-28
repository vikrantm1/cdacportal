import { Grid, Paper, TextField, Button, Avatar } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import { Toaster } from "react-hot-toast";

export default function StudyMaterialUpload() {
  

  return (
    <>
      <Grid align="center">
        <Paper
          elevation={4}
          style={{ width: "450px", height: "65vh", marginTop: "100px" }}
        >
          <div style={{ width: "400px" }}>
            <div className="pt-3">
              <Avatar style={{ background: "#1bbd7e" }}>
                <LibraryBooksIcon />
              </Avatar>
              <h4 style={{ color: "#1bbd7e" }}>Upload StudyMaterial</h4>
            </div>
            <TextField
              id="moduleName"
              label="Module name"
              variant="outlined"
              style={{ marginTop: "30px" }}
              fullWidth
            />
            <div>
              <TextField
                id="topicName"
                label="Topic name"
                variant="outlined"
                style={{ marginTop: "20px" }}
                fullWidth
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
                fullWidth
              >
                Upload
              </Button>
            </div>
          </div>
        </Paper>
        <Toaster position="top-center" reverseOrder={false} />
      </Grid>
    </>
  );
}
