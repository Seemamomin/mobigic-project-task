import { Button, Container, Grid, Typography, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    let uid = sessionStorage.getItem("uid");
    if (!uid) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 5 }}>
        <Paper elevation={2} sx={{ padding: 5, textAlign: "center" }}>
          <Typography variant="h4" textAlign="center" color="#4B9CD3">
            DASHBOARD
          </Typography>
          <Grid
            container
            marginTop={5}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Link to="/upload">
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ color: "black" }}
                >
                  Upload
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/files">
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ color: "black" }}
                >
                  Files
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
