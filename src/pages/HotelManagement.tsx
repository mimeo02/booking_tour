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

const mockHotels = [
  {
    id: 1,
    name: "Grand Hotel",
    address: "123 Nguyen Trai, Ha Noi",
    hotline: "0987654321",
    hotel_price: "2 - 3",
    create_at: "2025-04-16T22:06:45Z",
    update_at: "2025-04-17T15:24:53Z",
  },
  {
    id: 2,
    name: "Luxury Resort",
    address: "456 Le Loi, Da Nang",
    hotline: "0912345678",
    hotel_price: "4 - 5",
    create_at: "2025-05-10T10:00:00Z",
    update_at: "2025-05-11T11:30:00Z",
  },
];

const HotelManagement = () => {
  const [hotels, setHotels] = useState(mockHotels);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [searchType, setSearchType] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // api.get('/hotels').then(res => setHotels(res.data));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await api.post("/admin/hotels/find", {
        type: searchType,
        type_data: searchTerm,
      });
      setHotels(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error searching hotels:", error);
      setHotels([]);
    }
  };

  const handleCreateHotel = async (newHotel: any) => {
    console.log("Creating hotel:", newHotel);
    setOpenCreateModal(false);
  };

  const handleEditHotel = async (updatedHotel: any) => {
    console.log("Editing hotel:", updatedHotel);
    setOpenEditModal(false);
  };

  const handleDeleteHotel = async (hotelId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách sạn này?")) {
      console.log("Deleting hotel:", hotelId);
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
        <Typography color="text.primary">Quản lý khách sạn</Typography>
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
          Quản lý khách sạn
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
              <MenuItem value="id">Mã khách sạn</MenuItem>
              <MenuItem value="name">Tên khách sạn</MenuItem>
              <MenuItem value="area">Khu vực</MenuItem>
              <MenuItem value="hotline">Số điện thoại</MenuItem>
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
            + Thêm khách sạn
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Hotline</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.id}</TableCell>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.address}</TableCell>
                <TableCell>{hotel.hotline}</TableCell>
                <TableCell>{hotel.hotel_price}</TableCell>
                <TableCell>
                  {new Date(hotel.create_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(hotel.update_at).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setOpenEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteHotel(hotel.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Hotel Modal */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Thêm Khách Sạn mới</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Tên" fullWidth />
          <TextField margin="dense" label="Địa Chỉ" fullWidth />
          <TextField margin="dense" label="Khu vực" fullWidth />
          <TextField margin="dense" label="Hotline" fullWidth />
          <TextField margin="dense" label="Giá" fullWidth />
          <TextField margin="dense" label="Số sao" fullWidth />
          <TextField margin="dense" label="Điểm" fullWidth />
          <TextField margin="dense" label="Mô tả" fullWidth />
          <TextField margin="dense" label="IMG URL" fullWidth />
          <FormControl fullWidth margin="dense">
            <InputLabel>Trạng thái</InputLabel>
            <Select label="Trạng thái" defaultValue="Available">
              <MenuItem value="Fully booked">Đã Hết Phòng</MenuItem>
              <MenuItem value="Available">Còn Phòng</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Hủy</Button>
          <Button onClick={() => handleCreateHotel({})}>Tạo</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Hotel Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Chỉnh sửa Khách Sạn</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            fullWidth
            defaultValue={selectedHotel?.name}
          />
          <TextField
            margin="dense"
            label="Địa Chỉ"
            fullWidth
            defaultValue={selectedHotel?.address}
          />
          <TextField
            margin="dense"
            label="Mô tả"
            fullWidth
            defaultValue={selectedHotel?.description}
          />
          <TextField
            margin="dense"
            label="Hotline"
            fullWidth
            defaultValue={selectedHotel?.hotline}
          />
          <TextField
            margin="dense"
            label="Giá"
            fullWidth
            defaultValue={selectedHotel?.hotel_price}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Hủy</Button>
          <Button onClick={() => handleEditHotel({})}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelManagement;
