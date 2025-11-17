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
import { useState } from "react";

const SignUp = () => {
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const handleSignUpSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenOtpDialog(true);
  };

  const handleCloseOtpDialog = () => {
    setOpenOtpDialog(false);
  };

  const handleVerifyOtp = () => {
    // Add your OTP verification logic here
    console.log("Verifying OTP...");
    handleCloseOtpDialog();
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
        onSubmit={handleSignUpSubmit}
      >
        <Typography variant="h5" component="h1">
          Đăng ký
        </Typography>
        <TextField
          fullWidth
          required
          label="Tên đăng nhập"
          placeholder="Nhập tên đăng nhập"
          name="username"
        />
        <TextField
          fullWidth
          required
          label="Email"
          type="email"
          placeholder="Nhập email"
          name="email"
        />
        <TextField
          fullWidth
          required
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu"
          name="password"
        />
        <TextField
          fullWidth
          required
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          name="phone"
        />
        <TextField
          fullWidth
          required
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          name="fullName"
        />
        <TextField
          fullWidth
          required
          label="CCCD/CMND"
          placeholder="Nhập CCCD/CMND"
          name="idCard"
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
          <TextField autoFocus margin="dense" label="Mã OTP" fullWidth />
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
