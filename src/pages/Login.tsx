// Login.tsx
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { LoginPayloadSchema, loginPayloadSchema } from "../models/login.model";
import { useEffect, useState } from "react";
import api from "../api/axios";

const Login = () => {
  const [data, setData] = useState<any>(null);

  const formik = useFormik<LoginPayloadSchema>({
    initialValues: loginPayloadSchema.getDefault(),
    validationSchema: loginPayloadSchema,
    onSubmit: (form) => {
      handleLogin(form);
    },
  });

  const handleLogin = (payload: LoginPayloadSchema) => {
    // todo: call api
    console.log(payload);

    api
      .post("https://api.ducmanhsuncloud.click/login", {
        test: payload.username,
        password: payload.password,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: "25%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      <Typography variant="h5">Login</Typography>
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="Username"
        placeholder="Enter username"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="Password"
        placeholder="Enter password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Button variant="contained" type="submit" sx={{ width: "100%" }}>
        Login
      </Button>
    </form>
  );
};

export default Login;