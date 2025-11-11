import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";

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
      <RouterProvider router={routes} />
    </Box>
  );
}

export default App;
