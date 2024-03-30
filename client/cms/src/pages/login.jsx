import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [googleButtonLoaded, setGoogleButtonLoaded] = useState(false);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post("http://localhost:3000/api/login", {
        email: loginInput.email,
        password: loginInput.password,
      });
      localStorage.setItem("access_token", data.data.access_token);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Welcome Back !",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        text: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    async function handleCredentialResponse(response) {
      const { data } = await axios.post(
        "http://localhost:3000/api/google-login",
        {
          google_token: response.credential,
        }
      );
      localStorage.setItem("access_token", data.access_token);
      Swal.fire({
        icon: "success",
        text: "Welcome Back !",
      });
      navigate("/");
    }

    if (!googleButtonLoaded) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => {
        google.accounts.id.initialize({
          client_id:
            "131557880670-6hfuu4eot6cqd1dkoboi8ro9cj2utr7n.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
          theme: "outline",
          size: "large",
        });
        setGoogleButtonLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [googleButtonLoaded]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?vape)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
              <TextField
                onChange={handleChangeInput}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={handleChangeInput}
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
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Typography variant="body2" color="text.secondary" align="center">
                Don't have an account ?{" "}
                <Link to="/register" sx={{ color: "blue" }}>
                  Register Here
                </Link>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                marginTop={2}>
                Or Login with
              </Typography>
              <div
                id="buttonDiv"
                style={{
                  marginTop: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}></div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
