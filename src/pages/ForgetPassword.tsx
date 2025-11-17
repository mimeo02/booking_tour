import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const ForgetPassword = () => {
  return (
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
    >
      <Typography variant="h5" component="h1">
        Quên mật khẩu
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Vui lòng nhập địa chỉ email bạn muốn gửi thông tin đặt lại mật khẩu tới.
      </Typography>
      <TextField
        fullWidth
        required
        label="Địa chỉ Email"
        type="email"
        placeholder="Nhập email của bạn"
        name="email"
      />
      <Button variant="contained" type="submit" sx={{ width: "100%", mt: 2 }}>
        Gửi
      </Button>
    </Box>
  );
};

export default ForgetPassword;
