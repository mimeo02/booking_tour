import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { LoginPayloadSchema, loginPayloadSchema } from "../models/login.model";
import { useSnackbar } from "../providers/SnackbarProvider";

const Login = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik<LoginPayloadSchema>({
    initialValues: loginPayloadSchema.getDefault(),
    validationSchema: loginPayloadSchema,
    onSubmit: (form) => {
      handleLogin(form);
    },
  });

  const handleLogin = (payload: LoginPayloadSchema) => {
    api
      .post("https://api.ducmanhsuncloud.click/login", {
        username: payload.username,
        password: payload.password,
      })
      .then((res) => {
        navigate("/");
        showSnackbar("Đăng nhập thành công!", "success");
      })
      .catch((err) => {
        showSnackbar(
          err?.response?.data?.error || "Đã có lỗi xảy ra.",
          "error"
        );
      });
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
      <Typography variant="h5">Đăng nhập</Typography>
      <TextField
        fullWidth
        label="Tên đăng nhập"
        placeholder="Nhập tên đăng nhập"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        fullWidth
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={() => navigate("/forget-password")}
        >
          Quên mật khẩu?
        </Link>
      </Box>
      <Button variant="contained" type="submit" sx={{ width: "100%", mt: 1 }}>
        Đăng nhập
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Chưa có tài khoản?{" "}
        <Link
          component="button"
          type="button"
          onClick={() => navigate("/register")}
        >
          Đăng ký
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
