import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../api/axios";
import { useSnackbar } from "../providers/SnackbarProvider";

const ForgetPassword = () => {
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [userEmail, setUserEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email!"),
    }),
    onSubmit: async (values) => {
      try {
        await api.post("https://api.ducmanhsuncloud.click/forgot-password", {
          email: values.email,
        });
        setUserEmail(values.email);
        setStep("otp");
      } catch (error) {
        showSnackbar("Email không tồn tại trong hệ thống!", "error");
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Mã OTP phải có 6 chữ số!")
        .required("Vui lòng nhập mã OTP!"),
    }),
    onSubmit: (values) => {
      setUserOtp(values.otp);
      setStep("password");
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 ký tự!")
        .required("Vui lòng nhập mật khẩu mới!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Mật khẩu không khớp!")
        .required("Vui lòng xác nhận mật khẩu!"),
    }),
    onSubmit: async (values) => {
      try {
        await api.post("https://api.ducmanhsuncloud.click/reset-password", {
          email: userEmail,
          otp: userOtp,
          new_password: values.newPassword,
        });
        showSnackbar("Đổi mật khẩu thành công!", "success");
        navigate("/login");
      } catch (error) {
        showSnackbar(
          "Lỗi đặt lại mật khẩu! Vui lòng kiểm tra lại OTP.",
          "error"
        );
      }
    },
  });

  return (
    <>
      {step === "email" && (
        <Box
          component="form"
          onSubmit={emailFormik.handleSubmit}
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
          <Typography variant="h5" component="h1">
            Quên mật khẩu
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Vui lòng nhập địa chỉ email bạn muốn gửi thông tin đặt lại mật khẩu
            tới.
          </Typography>
          <TextField
            fullWidth
            label="Địa chỉ Email"
            name="email"
            value={emailFormik.values.email}
            onChange={emailFormik.handleChange}
            error={
              emailFormik.touched.email && Boolean(emailFormik.errors.email)
            }
            helperText={emailFormik.touched.email && emailFormik.errors.email}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", mt: 2 }}
          >
            Gửi
          </Button>
        </Box>
      )}

      {step === "otp" && (
        <Box
          component="form"
          onSubmit={otpFormik.handleSubmit}
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
          <Typography variant="h5" component="h1">
            Xác thực OTP
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Một mã OTP đã được gửi đến {userEmail}.
          </Typography>
          <TextField
            fullWidth
            label="Mã OTP"
            name="otp"
            value={otpFormik.values.otp}
            onChange={otpFormik.handleChange}
            error={otpFormik.touched.otp && Boolean(otpFormik.errors.otp)}
            helperText={otpFormik.touched.otp && otpFormik.errors.otp}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", mt: 2 }}
          >
            Xác thực
          </Button>
        </Box>
      )}

      {step === "password" && (
        <Box
          component="form"
          onSubmit={passwordFormik.handleSubmit}
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
          <Typography variant="h5" component="h1">
            Đặt lại mật khẩu
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="Mật khẩu mới"
            name="newPassword"
            value={passwordFormik.values.newPassword}
            onChange={passwordFormik.handleChange}
            error={
              passwordFormik.touched.newPassword &&
              Boolean(passwordFormik.errors.newPassword)
            }
            helperText={
              passwordFormik.touched.newPassword &&
              passwordFormik.errors.newPassword
            }
          />
          <TextField
            fullWidth
            type="password"
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            value={passwordFormik.values.confirmPassword}
            onChange={passwordFormik.handleChange}
            error={
              passwordFormik.touched.confirmPassword &&
              Boolean(passwordFormik.errors.confirmPassword)
            }
            helperText={
              passwordFormik.touched.confirmPassword &&
              passwordFormik.errors.confirmPassword
            }
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", mt: 2 }}
          >
            Đặt lại mật khẩu
          </Button>
        </Box>
      )}
    </>
  );
};

export default ForgetPassword;
