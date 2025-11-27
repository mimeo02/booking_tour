import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  SignUpPayloadSchema,
  signUpPayloadSchema,
} from "../models/signup.model";
import { useSnackbar } from "../providers/SnackbarProvider";

const SignUp = () => {
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik<SignUpPayloadSchema>({
    initialValues: signUpPayloadSchema.getDefault(),
    validationSchema: signUpPayloadSchema,
    onSubmit: (values) => {
      api
        .post("https://api.ducmanhsuncloud.click/register", {
          username: values.username,
          email: values.email,
          password: values.password,
          phone_number: values.phone,
          full_name: values.fullName,
          citizen_id: values.idCard,
        })
        .then(() => {
          setOpenOtpDialog(true);
        })
        .catch((err) => {
          showSnackbar(
            err?.response?.data?.error || "Đã có lỗi xảy ra",
            "error"
          );
        });
    },
  });

  const handleCloseOtpDialog = () => {
    setOpenOtpDialog(false);
  };

  const handleVerifyOtp = () => {
    // todo: handle otp is required
    const verificationData = { ...formik.values, otp };

    api
      .post("https://api.ducmanhsuncloud.click/register", verificationData)
      .then((res) => {
        if (res.data.message) {
          showSnackbar("Đăng ký thành công!", "success");
          navigate("/login");
        } else {
          showSnackbar(res.data.error || "Xác thực không thành công.", "error");
        }
      })
      .catch((err) => {
        showSnackbar(err.response?.data?.error || "Đã có lỗi xảy ra.", "error");
      });
  };

  return (
    <>
      <Box
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
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h5" component="h1">
          Đăng ký
        </Typography>
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
          label="Email"
          type="email"
          placeholder="Nhập email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
        <TextField
          fullWidth
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          fullWidth
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          fullWidth
          label="CCCD/CMND"
          placeholder="Nhập CCCD/CMND"
          name="idCard"
          value={formik.values.idCard}
          onChange={formik.handleChange}
          error={formik.touched.idCard && Boolean(formik.errors.idCard)}
          helperText={formik.touched.idCard && formik.errors.idCard}
        />
        <Button variant="contained" type="submit" sx={{ width: "100%", mt: 2 }}>
          Đăng ký
        </Button>
      </Box>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openOtpDialog}
        onClose={handleCloseOtpDialog}
      >
        <DialogTitle>Xác thực OTP</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Mã OTP"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOtpDialog}>Hủy</Button>
          <Button onClick={handleVerifyOtp} variant="contained">
            Xác thực
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUp;
