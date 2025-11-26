import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const userInvoiceData = {
  bookingInfo: {
    name: "Nguyễn Văn A",
    creationDate: "26/11/2025",
    bookingFor: "Bản thân",
  },
  orderInfo: {
    hotelName: "Khu nghỉ dưỡng & Spa sang trọng",
    address: "123 Ocean View Drive, Sunny Isles",
    roomType: "Suite hướng biển",
    roomCount: 1,
    roomPrice: "$450/đêm",
    checkInDate: "28/11/2025",
    checkOutDate: "30/11/2025",
    totalAmount: "$900",
  },
  paymentMethods: [
    { value: "vnpay", label: "VNPay" },
    { value: "cmnd", label: "CMND" },
    { value: "bank", label: "Tài khoản ngân hàng" },
    { value: "later", label: "Thanh toán sau" },
  ],
};

const UserInvoice = () => {
  const { bookingInfo, orderInfo, paymentMethods } = userInvoiceData;

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Thông tin hoá đơn
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin người đặt
        </Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Tên người đặt:</strong>
            </Typography>
            <Typography variant="body2">{bookingInfo.name}</Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Ngày tạo đơn:</strong>
            </Typography>
            <Typography variant="body2">{bookingInfo.creationDate}</Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Đặt cho:</strong>
            </Typography>
            <Typography variant="body2">{bookingInfo.bookingFor}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin đơn hàng
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="body1">
              <strong>Khách sạn:</strong>
            </Typography>
            <Typography variant="body2">{orderInfo.hotelName}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body1">
              <strong>Địa chỉ:</strong>
            </Typography>
            <Typography variant="body2">{orderInfo.address}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body1">
              <strong>Loại phòng:</strong>
            </Typography>
            <Typography variant="body2">{orderInfo.roomType}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body1">
              <strong>Số phòng:</strong>
            </Typography>
            <Typography variant="body2">{orderInfo.roomCount}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body1">
              <strong>Gía phòng:</strong>
            </Typography>
            <Typography variant="body2">{orderInfo.roomPrice}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body1">
              <strong>Ngày nhận phòng:</strong>
            </Typography>
            <Typography variant="body2">{orderInfo.checkInDate}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body1">
              <strong>Ngày trả phòng:</strong>
            </Typography>
            <Typography variant="body2">{orderInfo.checkOutDate}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" component="p">
              <strong>Tổng số tiền:</strong>
            </Typography>
            <Typography variant="h6" component="p" color="primary">
              {orderInfo.totalAmount}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="h6">Chọn phương thức thanh toán</Typography>
          </FormLabel>
          <RadioGroup
            aria-label="payment-method"
            defaultValue="vnpay"
            name="radio-buttons-group"
          >
            {paymentMethods.map((method) => (
              <FormControlLabel
                key={method.value}
                value={method.value}
                control={<Radio />}
                label={method.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default UserInvoice;
