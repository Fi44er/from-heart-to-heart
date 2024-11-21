import {
  Box,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";

const slides = [
  {
    id: 1,
    content: "/slideGalary1.png",
  },
  {
    id: 2,
    content: "/slideGalary2.png",
  },
  {
    id: 3,
    content: "/slideGalary3.png",
  },
  {
    id: 4,
    content: "/slideGalary4.png",
  },
  {
    id: 5,
    content: "/slideGalary5.png",
  },
];

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{ position: "absolute", left: 10, top: "50%", zIndex: 1 }}
    >
      <ArrowBackIcon sx={{ color: "white" }} />
    </IconButton>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{ position: "absolute", right: 10, top: "50%", zIndex: 1 }}
    >
      <ArrowForwardIcon sx={{ color: "white" }} />
    </IconButton>
  );
};

export default function GalarySection() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // добавлено для авто перелистывания
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: -50,
          width: { xs: 100, sm: 100, md: 200, lg: 300 },
          height: { xs: 100, sm: 100, md: 200, lg: 300 },
          backgroundColor: "#F7F01B",
          opacity: 0.2,
          zIndex: 0,
          transform: "rotate(45deg)",
          zIndex: -10,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: "40%",
          margin: 0,
          width: { xs: 100, sm: 100, md: 200, lg: 200 },
          height: { xs: 100, sm: 100, md: 200, lg: 200 },
          borderRadius: "50%",
          backgroundColor: "#F7F01B",
          opacity: 0.2,
          zIndex: -10,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "5%",
          width: { xs: 100, sm: 100, md: 200, lg: 300 },
          height: { xs: 100, sm: 100, md: 200, lg: 300 },
          backgroundColor: "#D46EFF",
          opacity: 0.2,
          zIndex: -10,
          transform: "rotate(75deg)",
        }}
      ></Box>
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Галерея фонда
        </Typography>
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: 600, md: "1000px" },
            margin: "auto",
          }}
        >
          <Slider {...settings}>
            {slides.map((slide) => (
              <div
                key={slide.id}
                style={{ position: "relative", textAlign: "center" }}
              >
                <CardMedia
                  component="img"
                  image={slide.content}
                  alt="png"
                  sx={{
                    width: "100%",
                    height: { xs: "250px", sm: "500px", md: "500px" },
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
}
