import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadFile() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uid, setUid] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("uid", JSON.stringify(uid));
      file && data.append("file", file);

      let result = await axios.post("http://localhost:4000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data) {
        alert(result.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    let uid = sessionStorage.getItem("uid");
    if (uid) {
      setUid(uid);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
              <Box
                component="form"
                onSubmit={onSubmit}
                encType="multipart/form-data"
                sx={{ textAlign: "center" }}
              >
                <Typography
                  variant="h5"
                  align="center"
                  marginBottom={2}
                  fontWeight={600}
                  color="#4B9CD3"
                >
                  UPLOAD FILE
                </Typography>
                <TextField
                  type="file"
                  required
                  name="file"
                  id="fileInput"
                  margin="normal"
                  onChange={onChange}
                />
                <br></br>
                <Button
                  type="submit"
                  variant="contained"
                  color="inherit"
                  sx={{ marginTop: 3, color: "black" }}
                >
                  Upload
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default UploadFile;
