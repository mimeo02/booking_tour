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
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import api from "../api/axios";

const mockSchedules = [
  {
    id: 1,
    customerName: "Nguyễn Văn A",
    hotelName: "Grand Hotel",
    roomName: "Phòng Deluxe King",
    checkIn: "2025-12-01",
    checkOut: "2025-12-05",
    status: "Confirmed",
  },
  {
    id: 2,
    customerName: "Trần Thị B",
    hotelName: "Luxury Resort",
    roomName: "Suite hướng biển",
    checkIn: "2025-12-03",
    checkOut: "2025-12-07",
    status: "Pending",
  },
];

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [searchType, setSearchType] = useState("customer");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // api.get('/admin/schedules').then(res => setSchedules(res.data));
  }, []);

  const handleSearch = async () => {
    // Placeholder for search logic
    console.log("Searching schedules:", { type: searchType, term: searchTerm });
  };

  const handleEditSchedule = async (updatedSchedule: any) => {
    console.log("Editing schedule:", updatedSchedule);
    setOpenEditModal(false);
  };

  const handleDeleteSchedule = async (scheduleId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch đặt phòng này?")) {
      console.log("Deleting schedule:", scheduleId);
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
        <Typography color="text.primary">Quản lý lịch</Typography>
      </Breadcrumbs>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Quản lý lịch
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={5}>
          <FormControl fullWidth>
            <InputLabel>Tìm kiếm theo</InputLabel>
            <Select
              value={searchType}
              label="Tìm kiếm theo"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <MenuItem value="customer">Tên khách hàng</MenuItem>
              <MenuItem value="hotel">Tên khách sạn</MenuItem>
              <MenuItem value="room">Tên phòng</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={5}>
          <TextField
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
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đặt phòng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Khách sạn</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Ngày nhận phòng</TableCell>
              <TableCell>Ngày trả phòng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.id}</TableCell>
                <TableCell>{schedule.customerName}</TableCell>
                <TableCell>{schedule.hotelName}</TableCell>
                <TableCell>{schedule.roomName}</TableCell>
                <TableCell>{schedule.checkIn}</TableCell>
                <TableCell>{schedule.checkOut}</TableCell>
                <TableCell>
                  <Chip
                    label={schedule.status}
                    color={
                      schedule.status === "Confirmed" ? "success" : "warning"
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedSchedule(schedule);
                      setOpenEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteSchedule(schedule.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Schedule Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Chỉnh sửa lịch đặt phòng</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Mã đặt phòng"
            fullWidth
            disabled
            defaultValue={selectedSchedule?.id}
          />
          <TextField
            margin="dense"
            label="Khách hàng"
            fullWidth
            disabled
            defaultValue={selectedSchedule?.customerName}
          />
          <TextField
            margin="dense"
            label="Ngày nhận phòng"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            defaultValue={selectedSchedule?.checkIn}
          />
          <TextField
            margin="dense"
            label="Ngày trả phòng"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            defaultValue={selectedSchedule?.checkOut}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Trạng thái</InputLabel>
            <Select label="Trạng thái" defaultValue={selectedSchedule?.status}>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Hủy</Button>
          <Button onClick={() => handleEditSchedule({})}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScheduleManagement;
