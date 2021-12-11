import { Button, Link, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { registerUser } from "../redux/actions/userActions";


type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  avatarLock: {
    backgroundColor: "#f1f1f1",
  },
});

const theme = createTheme();

const RegisterForm = () => {
  const [input, setInput] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { signup } = useAuth();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (input.confirmPassword !== input.password) {
      alert("The passwords must be the same");
      return;
    }
    e.preventDefault();
    signup(input);
    dispatch(registerUser(input));
    setInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar classes={{ root: classes.avatarLock }}>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  value={input.firstName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                  value={input.lastName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Dirección de email"
                  name="email"
                  autoComplete="email"
                  value={input.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={input.password}
                  onChange={handleChange}
                  error={
                    input.password.length >= 1 && input.password.length < 6
                  }
                  helperText={
                    input.password.length >= 1 &&
                    input.password.length < 6 &&
                    "La contraseña debe tener al menos 6 caracateres"
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type="password"
                  autoComplete="new-password"
                  value={input.confirmPassword}
                  onChange={handleChange}
                  error={input.confirmPassword !== input.password}
                  helperText={
                    input.confirmPassword !== input.password &&
                    "Contraseña incorrecta"
                  }
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              classes={{
                root: classes.root,
              }}
              disabled={
                input.confirmPassword !== input.password ||
                input.password.length < 6
              }
              color='primary'
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2" underline='hover'>
                Ya tienes una cuenta?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterForm;
