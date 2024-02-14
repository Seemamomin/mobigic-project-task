import {
  Button,
  Container,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FileList() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDownloadClick = (file) => {
    setSelectedFile(file);
  };

  const handleCodeSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/download/${selectedFile._id}`,
        { code },
        { responseType: "blob" }
      );

      if (response.data) {
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = selectedFile.originalName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      } else {
        console.error("Empty or invalid response for file download.");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      if (error.response) {
        alert(error.response.statusText);
      }
    } finally {
      setSelectedFile(null);
      setCode("");
    }
  };

  useEffect(() => {
    let uid = sessionStorage.getItem("uid");
    if (uid) {
      const fetchFiles = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/get-file-list/${uid}`
          );
          setFiles(response.data);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      };
      fetchFiles();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={2}>
          <Typography
            variant="h5"
            textTransform="uppercase"
            margin={2}
            textAlign="center"
            paddingTop={2}
            color="#4B9CD3"
          >
            uploaded files
          </Typography>
          {files.length === 0 && (
            <>
              <Typography
                variant="h5"
                textTransform="uppercase"
                margin={2}
                textAlign="center"
              >
                No Files Found...!
              </Typography>
            </>
          )}
          <List>
            {files.map((file, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <div>
                  <div>Sr.No. {index + 1}</div>
                  <div>File Name: {file.originalName}</div>
                  <div>File ID: {file.uniqueNo}</div>
                </div>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ color: "black" }}
                  onClick={() => handleDownloadClick(file)}
                >
                  Download
                </Button>
              </ListItem>
            ))}
          </List>

          <Dialog
            open={Boolean(selectedFile)}
            onClose={() => setSelectedFile(null)}
          >
            <DialogTitle color="#4B9CD3">Enter 6-digit Code</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                placeholder="6 digit code"
                variant="outlined"
                value={code}
                size="small"
                onChange={(e) => setCode(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCodeSubmit}
                variant="contained"
                color="inherit"
                sx={{ color: "black" }}
              >
                Submit
              </Button>
              <Button
                onClick={() => setSelectedFile(null)}
                variant="contained"
                color="inherit"
                sx={{ color: "black" }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </>
  );
}

export default FileList;
