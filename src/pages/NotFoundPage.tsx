import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Chuyển hướng người dùng về tuyến đường gốc ("/")
    navigate("/");
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ textAlign: "center", mt: 10 }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h1" component="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Không tìm thấy Trang
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Xin lỗi, đường dẫn URL bạn truy cập không tồn tại.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Quay về Trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
