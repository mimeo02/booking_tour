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

const mockServices = [
  {
    id: 1,
    service_name: "Bữa sáng",
    price: 150000,
    create_at: "2025-11-20T09:00:00Z",
    update_at: "2025-11-20T09:00:00Z",
  },
  {
    id: 2,
    service_name: "Đưa đón sân bay",
    price: 500000,
    create_at: "2025-11-21T11:00:00Z",
    update_at: "2025-11-22T11:00:00Z",
  },
];

const ServiceManagement = () => {
  const [services, setServices] = useState(mockServices);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [searchType, setSearchType] = useState("service_name");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // api.get('/additionalservices').then(res => setServices(res.data));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await api.post("/admin/additionalservices/find", {
        type: searchType,
        type_data: searchTerm,
      });
      setServices(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error searching services:", error);
      setServices([]);
    }
  };

  const handleCreateService = async (newService: any) => {
    console.log("Creating service:", newService);
    setOpenCreateModal(false);
  };

  const handleEditService = async (updatedService: any) => {
    console.log("Editing service:", updatedService);
    setOpenEditModal(false);
  };

  const handleDeleteService = async (serviceId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      console.log("Deleting service:", serviceId);
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
        <Typography color="text.primary">Quản lý dịch vụ</Typography>
      </Breadcrumbs>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Quản lý dịch vụ
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={4}>
          <FormControl fullWidth>
            <InputLabel>Lọc theo</InputLabel>
            <Select
              value={searchType}
              label="Lọc theo"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <MenuItem value="service_name">Tên dịch vụ</MenuItem>
              <MenuItem value="id">Mã dịch vụ</MenuItem>
              <MenuItem value="price">Giá dịch vụ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Nhập thông tin để lọc"
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
            + Thêm dịch vụ
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên dịch vụ</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.service_name}</TableCell>
                <TableCell>{service.price.toLocaleString()} VND</TableCell>
                <TableCell>
                  {new Date(service.create_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(service.update_at).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedService(service);
                      setOpenEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteService(service.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Service Modal */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Thêm Dịch vụ mới</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Tên dịch vụ" fullWidth />
          <TextField
            margin="dense"
            label="Giá dịch vụ"
            fullWidth
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Hủy</Button>
          <Button onClick={() => handleCreateService({})}>Tạo</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Service Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Chỉnh sửa Dịch vụ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên dịch vụ"
            fullWidth
            defaultValue={selectedService?.service_name}
          />
          <TextField
            margin="dense"
            label="Giá dịch vụ"
            fullWidth
            type="number"
            defaultValue={selectedService?.price}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Hủy</Button>
          <Button onClick={() => handleEditService({})}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceManagement;
