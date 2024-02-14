import React, { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let uid = sessionStorage.getItem("uid");
    if (uid) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [show]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#4B9CD3" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            textTransform="uppercase"
            fontWeight={500}
            sx={{ flexGrow: 1 }}
          >
            File Upload Handling App
          </Typography>
          {show ? (
            <>
              <Link to="/register">
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ color: "black" }}
                >
                  Register
                </Button>
              </Link>
              <Button
                variant="contained"
                color="inherit"
                sx={{ marginLeft: "20px", color: "black" }}
                onClick={() => {
                  let uid = sessionStorage.getItem("uid");
                  if (uid) {
                    navigate("/dashboard");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="inherit"
                sx={{ marginLeft: "20px", color: "black" }}
                onClick={() => {
                  sessionStorage.clear();
                  setShow(true);
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
