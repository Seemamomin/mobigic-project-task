import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      let object = {
        userName: data.get("userName"),
        password: data.get("password"),
      };
      let result = await axios.post("http://localhost:4000/login", object);
      if (result.data) {
        alert(result.data.message);
        sessionStorage.setItem("uid", result.data.uid);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    let uid = sessionStorage.getItem("uid");
    if (uid) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="#4B9CD3" textTransform="uppercase">
              Login Here
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="User Name"
                name="userName"
                autoComplete="userName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                variant="contained"
                color="inherit"
                type="submit"
                fullWidth
                size="large"
                sx={{ color: "black", mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
