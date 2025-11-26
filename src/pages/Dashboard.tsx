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
import { useEffect, useState } from "react";
import api from "../api/axios";

interface Hotel {
  address: string;
  area: string;
  create_at: string;
  description: string;
  hotel_price: string;
  hotline: string;
  id: number;
  image_url: string;
  name: string;
  rate: string;
  review_score: string;
  status: string;
  update_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [hotelList, setHotelList] = useState<Hotel[]>([]);

  const handleHotelClick = (hotelId: string | number) => {
    navigate(`/hotels/${hotelId}/rooms`);
  };

  useEffect(() => {
    const queryParams = "";
    api
      .get(`https://api.ducmanhsuncloud.click/hotels${queryParams}`)
      .then((res) => setHotelList(res?.data || []));
  }, []);

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
            {/* todo: update image */}
            <CardMedia
              component="img"
              height="194"
              image={`https://api.ducmanhsuncloud.click${hotel.image_url}`}
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
              <Rating
                name="read-only"
                value={parseFloat(hotel.rate)}
                readOnly
              />
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
