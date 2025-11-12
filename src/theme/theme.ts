import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiDialogActions: {
      defaultProps: {
        className: "default-dialog-actions-class",
        style: { padding: "8px 24px 16px 24px" },
      },
    },
  },
});
