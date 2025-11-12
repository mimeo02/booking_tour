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
          Sign Up
        </Typography>
        <TextField
          fullWidth
          required
          label="Username"
          placeholder="Enter username"
          name="username"
        />
        <TextField
          fullWidth
          required
          label="Email"
          type="email"
          placeholder="Enter email"
          name="email"
        />
        <TextField
          fullWidth
          required
          label="Password"
          type="password"
          placeholder="Enter password"
          name="password"
        />
        <TextField
          fullWidth
          required
          label="Phone Number"
          placeholder="Enter phone number"
          name="phone"
        />
        <TextField
          fullWidth
          required
          label="Full Name"
          placeholder="Enter full name"
          name="fullName"
        />
        <TextField
          fullWidth
          required
          label="CCCD/CMND"
          placeholder="Enter CCCD/CMND"
          name="idCard"
        />
        <Button variant="contained" type="submit" sx={{ width: "100%", mt: 2 }}>
          Sign Up
        </Button>
      </Box>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openOtpDialog}
        onClose={handleCloseOtpDialog}
      >
        <DialogTitle>Verification OTP</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="OTP Code" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOtpDialog}>Cancel</Button>
          <Button onClick={handleVerifyOtp} variant="contained">
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUp;
