import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem from @mui/material
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useSnackbar } from "notistack";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Kaya Connect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("Doctor"); // Set initial role state to "Doctor"
  const { enqueueSnackbar } = useSnackbar();

  const Role = [
    {
      value: "Doctor",
      label: "Doctor",
    },
    {
      value: "Receptionist",
      label: "Receptionist",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, email, password, role);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username,
          email,
          password,
          role,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 201) {
        enqueueSnackbar("User Registered", { variant: "success" });
      }
    } catch (error) {
      console.log(error);

      if (error.response.status == 404) {
        enqueueSnackbar("All fields are required", {
          variant: "error",
        });
      } else if (error.response.status == 409) {
        enqueueSnackbar("invalid password", { variant: "error" });
      } else if (error.response.status == 400) {
        enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
      } else {
        enqueueSnackbar("An error occured", { variant: "error" });
      }
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    console.log(event.target.value);
    setRole(event.target.value);
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleUsernameChange}
                  multiline
                  value={username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  multiline
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  required
                  fullWidth
                  name="role"
                  label="Role"
                  defaultValue="Doctor"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="Doctor">Doctor</MenuItem>
                  <MenuItem value="Reception">Reception</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register User
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
