import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={routes} />
      </LocalizationProvider>
    </Box>
  );
}

export default App;
