import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const hotelList = [
  {
    id: 0,
    name: "Khu nghỉ dưỡng & Spa sang trọng",
    address: "123 Ocean View Drive, Sunny Isles",
    rate: 5,
    hotline: "1-800-555-0101",
    status: "Còn phòng",
    image:
      "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
  },
  {
    id: 1,
    name: "Khách sạn Grand Budapest",
    address: "456 Mountain Pass, Alpine Valley",
    rate: 4,
    hotline: "1-800-555-0102",
    status: "Còn phòng",
    image:
      "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
  },
  {
    id: 2,
    name: "Khách sạn Downtown Metro",
    address: "789 City Center Plaza, Metropolis",
    rate: 3,
    hotline: "1-800-555-0103",
    status: "Số lượng có hạn",
    image:
      "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleHotelClick = (hotelId: string | number) => {
    navigate(`/hotels/${hotelId}/rooms`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Dù bạn đi đâu, Hotel Booking sẽ lo.
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <TextField label="Địa điểm" variant="outlined" />
        <DatePicker label="Ngày nhận phòng" />
        <DatePicker label="Ngày trả phòng" />
        <Button variant="contained" size="large">
          Tìm kiếm
        </Button>
      </Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mt: 4, textAlign: "center" }}
      >
        Khách sạn hàng đầu
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mt: 2,
        }}
      >
        {hotelList.map((hotel, index) => (
          <Card
            key={index}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.333% - 16px)",
              },
              textAlign: "left",
            }}
            onClick={() => handleHotelClick(hotel.id)}
          >
            <CardMedia
              component="img"
              height="194"
              image={hotel.image}
              alt={hotel.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {hotel.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <LocationOnIcon sx={{ mr: 0.5 }} />
                {hotel.address}
              </Typography>
              <Rating name="read-only" value={hotel.rate} readOnly />
              <Typography variant="body2" color="text.secondary">
                Hotline: {hotel.hotline}
              </Typography>
              <Typography
                variant="body2"
                color={
                  hotel.status === "Available" ? "success.main" : "warning.main"
                }
              >
                {hotel.status}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
