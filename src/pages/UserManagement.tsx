import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const mockUsers = [
  {
    id: 1,
    username: "nguyenvana",
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    createdAt: "2025-10-20",
    updatedAt: "2025-11-25",
  },
  {
    id: 2,
    username: "tranthib",
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    createdAt: "2025-10-21",
    updatedAt: "2025-11-24",
  },
  {
    id: 3,
    username: "levanc",
    fullName: "Lê Văn C",
    email: "levanc@example.com",
    createdAt: "2025-10-22",
    updatedAt: "2025-11-23",
  },
];

const UserManagement = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={6}>
          <TextField fullWidth label="Mã người dùng" variant="outlined" />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth label="Nhập thông tin" variant="outlined" />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user management table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.updatedAt}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserManagement;
