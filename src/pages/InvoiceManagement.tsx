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
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import api from "../api/axios";

const mockInvoices = [
  {
    id: 1,
    customerName: "Nguyễn Văn A",
    hotelName: "Grand Hotel",
    roomName: "Phòng Deluxe King",
    total_price: 4500000,
    state: "Paid",
    is_for_someone_else: false,
    updated_at: "2025-11-28T10:00:00Z",
  },
  {
    id: 2,
    customerName: "Trần Thị B",
    hotelName: "Luxury Resort",
    roomName: "Suite hướng biển",
    total_price: 10000000,
    state: "Pending",
    is_for_someone_else: true,
    updated_at: "2025-11-27T15:30:00Z",
  },
];

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [searchType, setSearchType] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // api.get('/admin/invoices').then(res => setInvoices(res.data));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await api.post("/admin/invoices/find", {
        type: searchType,
        type_data: searchTerm,
      });
      setInvoices(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error searching invoices:", error);
      setInvoices([]);
    }
  };

  const handleCreateInvoice = async (newInvoice: any) => {
    console.log("Creating invoice:", newInvoice);
    setOpenCreateModal(false);
  };

  const handleEditInvoice = async (updatedInvoice: any) => {
    console.log("Editing invoice:", updatedInvoice);
    setOpenEditModal(false);
  };

  const handleDeleteInvoice = async (invoiceId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      console.log("Deleting invoice:", invoiceId);
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
        <Typography color="text.primary">Quản lý hóa đơn</Typography>
      </Breadcrumbs>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Quản lý hóa đơn
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={4}>
          <FormControl fullWidth>
            <InputLabel>Tìm kiếm theo</InputLabel>
            <Select
              value={searchType}
              label="Tìm kiếm theo"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <MenuItem value="id">Mã hóa đơn</MenuItem>
              <MenuItem value="customers">Tên người dùng</MenuItem>
              <MenuItem value="hotels">Tên Khách Sạn</MenuItem>
              <MenuItem value="state">Trạng thái</MenuItem>
              <MenuItem value="total_price">Giá trị (lớn hơn)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Nhập thông tin tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid size={2}>
          <Button fullWidth variant="contained" onClick={handleSearch}>
            Lọc
          </Button>
        </Grid>
        <Grid size={2}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => setOpenCreateModal(true)}
          >
            + Thêm hóa đơn
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã hóa đơn</TableCell>
              <TableCell>Tên người tạo</TableCell>
              <TableCell>Khách sạn</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Tổng giá trị</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Đặt cho</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>{invoice.hotelName}</TableCell>
                <TableCell>{invoice.roomName}</TableCell>
                <TableCell>
                  {invoice.total_price.toLocaleString()} VND
                </TableCell>
                <TableCell>
                  <Chip
                    label={invoice.state}
                    color={invoice.state === "Paid" ? "success" : "warning"}
                  />
                </TableCell>
                <TableCell>
                  {invoice.is_for_someone_else ? "Người khác" : "Bản thân"}
                </TableCell>
                <TableCell>
                  {new Date(invoice.updated_at).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setOpenEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteInvoice(invoice.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Invoice Modal */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Thêm Hóa đơn mới</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Khách sạn</InputLabel>
            <Select label="Khách sạn" defaultValue="">
              <MenuItem value={1}>Grand Hotel</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Phòng</InputLabel>
            <Select label="Phòng" defaultValue="">
              <MenuItem value={1}>Phòng Deluxe King</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Ngày nhận phòng"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Ngày trả phòng"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl component="fieldset" margin="dense">
            <Typography variant="subtitle1">Dịch vụ thêm</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Bữa sáng" />
              <FormControlLabel
                control={<Checkbox />}
                label="Đưa đón sân bay"
              />
            </FormGroup>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Đặt cho ai</InputLabel>
            <Select label="Đặt cho ai" defaultValue="False">
              <MenuItem value="False">Bản thân</MenuItem>
              <MenuItem value="True">Người khác</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Hủy</Button>
          <Button onClick={() => handleCreateInvoice({})}>Tạo</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Invoice Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Chỉnh sửa Hóa đơn</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Mã hóa đơn"
            fullWidth
            disabled
            defaultValue={selectedInvoice?.id}
          />
          <TextField
            margin="dense"
            label="Người tạo"
            fullWidth
            disabled
            defaultValue={selectedInvoice?.customerName}
          />
          <TextField
            margin="dense"
            label="Khách sạn"
            fullWidth
            disabled
            defaultValue={selectedInvoice?.hotelName}
          />
          <TextField
            margin="dense"
            label="Phòng"
            fullWidth
            disabled
            defaultValue={selectedInvoice?.roomName}
          />
          <TextField
            margin="dense"
            label="Ngày nhận phòng"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Ngày trả phòng"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Trạng thái"
            fullWidth
            disabled
            defaultValue={selectedInvoice?.state}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Hủy</Button>
          <Button onClick={() => handleEditInvoice({})}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvoiceManagement;
