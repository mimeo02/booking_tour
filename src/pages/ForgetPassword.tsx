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
        Forget Password
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Please enter the email address you'd like your password reset
        information sent to.
      </Typography>
      <TextField
        fullWidth
        required
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        name="email"
      />
      <Button variant="contained" type="submit" sx={{ width: "100%", mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default ForgetPassword;
