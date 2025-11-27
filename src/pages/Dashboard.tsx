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
import dayjs, { Dayjs } from "dayjs";

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
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

  const handleHotelClick = (hotelId: string | number) => {
    navigate(`/hotels/${hotelId}/rooms`);
  };

  const handleSearch = (event: React.FormEvent) => {
    const queryParams = {
      area: location ?? null,
      check_in: checkInDate ? dayjs(checkInDate).format("YYYY-MM-DD") : null,
      check_out: checkOutDate ? dayjs(checkOutDate).format("YYYY-MM-DD") : null,
    };

    api
      .post(`https://api.ducmanhsuncloud.click/hotels/find`, queryParams)
      .then((res) => setHotelList(res?.data || []))
      .catch((err) => {
        console.error("Failed to fetch hotels:", err);
        setHotelList([]);
      });
  };

  useEffect(() => {
    const queryParams = "";
    api
      .get(`https://api.ducmanhsuncloud.click/hotels${queryParams}`)
      .then((res) => setHotelList(res?.data || []))
      .catch((err) => {
        console.error("Failed to fetch hotels:", err);
        setHotelList([]);
      });
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
        <TextField
          label="Địa điểm"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <DatePicker
          label="Ngày nhận phòng"
          value={checkInDate ? dayjs(checkInDate) : null}
          onChange={(newValue) => setCheckInDate(newValue)}
        />
        <DatePicker
          label="Ngày trả phòng"
          value={checkOutDate ? dayjs(checkOutDate) : null}
          onChange={(newValue) => setCheckOutDate(newValue)}
        />
        <Button variant="contained" size="large" onClick={handleSearch}>
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
      {hotelList.length > 0 ? (
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
                    hotel.status === "Available"
                      ? "success.main"
                      : "warning.main"
                  }
                >
                  {hotel.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography>Không tìm thấy khách sạn phù hợp.</Typography>
      )}
    </Box>
  );
};

export default Dashboard;
