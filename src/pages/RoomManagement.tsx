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

const mockRooms = [
  {
    id: 1,
    hotel_id: 1,
    name: "Phòng Deluxe King",
    services: "Wifi, TV, Minibar",
    availability: 10,
    price: 3000000,
    update_at: "2025-11-26T10:00:00Z",
  },
  {
    id: 2,
    hotel_id: 1,
    name: "Suite hướng biển",
    services: "Wifi, TV, Minibar, Bồn tắm",
    availability: 5,
    price: 5000000,
    update_at: "2025-11-25T14:30:00Z",
  },
];

const RoomManagement = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [searchType, setSearchType] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // api.get('/admin/roomtypes').then(res => setRooms(res.data));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await api.post("/admin/roomtypes/find", {
        type: searchType,
        type_data: searchTerm,
      });
      setRooms(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error searching rooms:", error);
      setRooms([]);
    }
  };

  const handleCreateRoom = async (newRoom: any) => {
    console.log("Creating room:", newRoom);
    setOpenCreateModal(false);
  };

  const handleEditRoom = async (updatedRoom: any) => {
    console.log("Editing room:", updatedRoom);
    setOpenEditModal(false);
  };

  const handleDeleteRoom = async (roomId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
      console.log("Deleting room:", roomId);
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
        <Typography color="text.primary">Quản lý phòng</Typography>
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
          Quản lý phòng
        </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={3}>
          <FormControl fullWidth>
            <InputLabel>Tìm kiếm theo</InputLabel>
            <Select
              size="small"
              value={searchType}
              label="Tìm kiếm theo"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <MenuItem value="id">Mã Phòng</MenuItem>
              <MenuItem value="hotel_id">Mã khách sạn</MenuItem>
              <MenuItem value="name">Tên Phòng</MenuItem>
              <MenuItem value="availability">Số lượng trống</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <TextField
            size="small"
            fullWidth
            label="Nhập thông tin tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid size={2}>
          <Button fullWidth variant="contained" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Grid>
        <Grid size={3}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => setOpenCreateModal(true)}
          >
            + Thêm phòng
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã Phòng</TableCell>
              <TableCell>Mã Khách sạn</TableCell>
              <TableCell>Tên Phòng</TableCell>
              <TableCell>Dịch vụ</TableCell>
              <TableCell>Còn trống</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Cập nhật</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.hotel_id}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.services}</TableCell>
                <TableCell>{room.availability}</TableCell>
                <TableCell>{room.price.toLocaleString()} VND</TableCell>
                <TableCell>
                  {new Date(room.update_at).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedRoom(room);
                      setOpenEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteRoom(room.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Room Modal */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Thêm Phòng mới</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Tên" fullWidth />
          <TextField margin="dense" label="Diện tích" fullWidth />
          <TextField margin="dense" label="Dịch vụ" fullWidth />
          <TextField margin="dense" label="Số người ở" fullWidth />
          <TextField margin="dense" label="IMG URL" fullWidth />
          <TextField margin="dense" label="Loại giường" fullWidth />
          <TextField margin="dense" label="Đánh giá" fullWidth />
          <TextField margin="dense" label="Còn trống" fullWidth />
          <TextField margin="dense" label="Giá" fullWidth />
          <FormControl fullWidth margin="dense">
            <InputLabel>Khách sạn</InputLabel>
            <Select label="Khách sạn" defaultValue="">
              <MenuItem value={1}>Grand Hotel</MenuItem>
              <MenuItem value={2}>Luxury Resort</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Hủy</Button>
          <Button onClick={() => handleCreateRoom({})}>Tạo</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Room Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Chỉnh sửa Phòng</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên Phòng"
            fullWidth
            defaultValue={selectedRoom?.name}
          />
          <TextField
            margin="dense"
            label="Loại giường"
            fullWidth
            defaultValue={selectedRoom?.bed_type}
          />
          <TextField
            margin="dense"
            label="Số người ở"
            fullWidth
            defaultValue={selectedRoom?.capacity}
          />
          <TextField
            margin="dense"
            label="Dịch vụ"
            fullWidth
            defaultValue={selectedRoom?.services}
          />
          <TextField
            margin="dense"
            label="Còn trống"
            fullWidth
            defaultValue={selectedRoom?.availability}
          />
          <TextField
            margin="dense"
            label="Giá"
            fullWidth
            defaultValue={selectedRoom?.price}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Hủy</Button>
          <Button onClick={() => handleEditRoom({})}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomManagement;
