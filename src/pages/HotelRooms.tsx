import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const hotel = {
  id: 0,
  name: "Khu nghỉ dưỡng & Spa sang trọng",
  address: "123 Ocean View Drive, Sunny Isles",
  location: "Sunny Isles",
  rate: 5,
  price: "$250/night",
  hotline: "1-800-555-0101",
  status: "Còn phòng",
  description:
    "A luxurious beachfront resort offering world-class amenities, a full-service spa, and breathtaking ocean views. Perfect for a relaxing getaway.",
  image:
    "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
};

const roomList = [
  {
    hotelId: 0,
    name: "Suite hướng biển",
    price: "$450/night",
    available: 5,
    image:
      "https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=",
  },
  {
    hotelId: 1,
    name: "Phòng Deluxe King",
    price: "$300/night",
    available: 10,
    image:
      "https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=",
  },
  {
    hotelId: 2,
    name: "Suite Courtesan au Chocolat",
    price: "$550/night",
    available: 3,
    image:
      "https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=",
  },
  {
    hotelId: 3,
    name: "Phòng Standard Queen",
    price: "$220/night",
    available: 15,
    image:
      "https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=",
  },
];

const HotelRooms = () => {
  // todo: use hotelId to get hotelRoom Detail
  // const { hotelId } = useParams<{ hotelId: string }>();

  if (!hotel) {
    return <Typography variant="h5">Không tìm thấy khách sạn.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {hotel.name}
      </Typography>
      <Card sx={{ maxWidth: 800, width: "100%" }}>
        <CardMedia
          component="img"
          height="400"
          image={hotel.image}
          alt={hotel.name}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {hotel.description}
          </Typography>
          <Typography variant="h6">Chi tiết:</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LocationOnIcon sx={{ mr: 0.5 }} />
            {hotel.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Địa điểm: {hotel.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Đường dây nóng: {hotel.hotline}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Giá: {hotel.price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Đánh giá:
            </Typography>
            <Rating name="read-only" value={hotel.rate} readOnly />
          </Box>
          <Typography
            variant="body2"
            color={
              hotel.status === "Còn phòng" ? "success.main" : "warning.main"
            }
          >
            Trạng thái: {hotel.status}
          </Typography>
        </CardContent>
      </Card>

      <Typography
        variant="h5"
        component="h2"
        sx={{ mt: 4, textAlign: "center" }}
      >
        Danh sách phòng
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mt: 2,
          maxWidth: 800,
          width: "100%",
        }}
      >
        {roomList.map((room, index) => (
          <Card
            key={index}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
              },
              textAlign: "left",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={room.image}
              alt={room.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {room.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Giá: {room.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Số phòng còn trống: {room.available}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HotelRooms;
