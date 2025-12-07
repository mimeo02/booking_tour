import {
  Box,
  Toolbar,
  Typography
} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const drawerWidth = 240;

const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <Typography p={2}>Thanh bên</Typography>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Header/>

      <Box
        component="main"
        sx={{
          my: 4,
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LandingPage;
