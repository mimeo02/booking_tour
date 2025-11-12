import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { LoginPayloadSchema, loginPayloadSchema } from "../models/login.model";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  const formik = useFormik<LoginPayloadSchema>({
    initialValues: loginPayloadSchema.getDefault(),
    validationSchema: loginPayloadSchema,
    onSubmit: (form) => {
      handleLogin(form);
    },
  });

  const handleLogin = (payload: LoginPayloadSchema) => {
    // todo: call api
    api
      .post("https://api.ducmanhsuncloud.click/login", {
        username: payload.username,
        password: payload.password,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: { xs: "90%", sm: "50%", md: "30%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5">Login</Typography>
      <TextField
        fullWidth
        required
        label="Username"
        placeholder="Enter username"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        required
        label="Password"
        type="password"
        placeholder="Enter password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Box>
      <Button variant="contained" type="submit" sx={{ width: "100%", mt: 1 }}>
        Login
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link
          component="button"
          type="button"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
