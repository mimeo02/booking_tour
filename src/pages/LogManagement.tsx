import {
  Box,
  Breadcrumbs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import api from "../api/axios";

const mockLogs = [
  {
    customer_id: 1,
    username: "admin",
    created_at: "2025-11-29T10:30:00Z",
    action: "Login",
  },
  {
    customer_id: 2,
    username: "nguyenvana",
    created_at: "2025-11-29T10:32:00Z",
    action: "Create Invoice",
  },
  {
    customer_id: 1,
    username: "admin",
    created_at: "2025-11-29T10:35:00Z",
    action: "Delete User",
  },
];

const LogManagement = () => {
  const [logs, setLogs] = useState(mockLogs);

  useEffect(() => {
    // api.get('/admin/logs').then(res => setLogs(res.data));
  }, []);

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
        <Typography color="text.primary">Xem log</Typography>
      </Breadcrumbs>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Danh sách Log
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Người Dùng</TableCell>
              <TableCell>Tên Người Dùng</TableCell>
              <TableCell>Thời Gian</TableCell>
              <TableCell>Hoạt Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.customer_id}</TableCell>
                <TableCell>{log.username}</TableCell>
                <TableCell>
                  {new Date(log.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{log.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LogManagement;
