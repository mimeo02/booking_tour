import {
  Box,
  Breadcrumbs,
  Grid,
  Button,
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
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import api from "../api/axios";

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
  const [users, setUsers] = useState(mockUsers);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchType, setSearchType] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch users from API on component mount
    // api.get('/admin/customers').then(res => setUsers(res.data));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await api.post("/admin/customers/find", {
        type: searchType,
        type_data: searchTerm,
      });
      setUsers(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error searching users:", error);
      setUsers([]);
    }
  };

  const handleCreateUser = async (newUser: any) => {
    // API call to create user
    console.log("Creating user:", newUser);
    setOpenCreateModal(false);
  };

  const handleEditUser = async (updatedUser: any) => {
    // API call to update user
    console.log("Editing user:", updatedUser);
    setOpenEditModal(false);
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      // API call to delete user
      console.log("Deleting user:", userId);
    }
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to="/admin"
        >
          Admin
        </Link>
        <Typography color="text.primary">Quản lý người dùng</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Quản lý người dùng
        </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={4}>
          <FormControl fullWidth>
            <InputLabel>Tìm kiếm theo</InputLabel>
            <Select
              value={searchType}
              label="Tìm kiếm theo"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <MenuItem value="id">Mã người dùng</MenuItem>
              <MenuItem value="username">Tên đăng nhập</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="full_name">Tên đầy đủ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Nhập thông tin"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid size={2}>
          <Button fullWidth variant="contained" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Grid>
        <Grid size={2}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => setOpenCreateModal(true)}
          >
            + Thêm người dùng
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create User Modal */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <DialogContent>
          {/* Form fields for creating a user */}
          <TextField autoFocus margin="dense" label="Username" fullWidth />
          <TextField margin="dense" label="Email" type="email" fullWidth />
          <TextField
            margin="dense"
            label="Mật khẩu"
            type="password"
            fullWidth
          />
          <TextField margin="dense" label="Số điện thoại" fullWidth />
          <TextField margin="dense" label="Họ tên" fullWidth />
          <TextField margin="dense" label="CMND/CCCD" fullWidth />
          <FormControl fullWidth margin="dense">
            <InputLabel>Vai trò</InputLabel>
            <Select label="Vai trò" defaultValue="customer">
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Hủy</Button>
          <Button onClick={() => handleCreateUser({})}>Tạo</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
        <DialogContent>
          {/* Form fields for editing a user */}
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            defaultValue={selectedUser?.username}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            defaultValue={selectedUser?.email}
          />
          <TextField
            margin="dense"
            label="Mật khẩu (mới)"
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Số điện thoại"
            fullWidth
            defaultValue={selectedUser?.phone}
          />
          <TextField
            margin="dense"
            label="Họ tên"
            fullWidth
            defaultValue={selectedUser?.fullName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Hủy</Button>
          <Button onClick={() => handleEditUser({})}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
