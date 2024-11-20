import {
  Box,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useParams } from "react-router-dom";
import axios from "axios";
import useNewsStore from "../../store/newsStore";
import { urlPictures } from "../../constants/contants";

export default function NewsDynamicPage() {
  const { id } = useParams();
  const { newsItem, fetchNewsItem } = useNewsStore();

  useEffect(() => {
    fetchNewsItem(id);
  }, [id, fetchNewsItem]);

  if (!newsItem) {
    return <Typography variant="h6">Загрузка...</Typography>;
  }

  return (
    <Box flex={9} p={2}>
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          mb: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "unset" },
            gridGap: "20px",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" component="h2">
                {newsItem.result.Title}
              </Typography>
            </Box>
            <Box>
              <CardContent>
                <Typography variant="h6" component="p">
                  {newsItem.result.Description}
                </Typography>
              </CardContent>
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <CardMedia
              component="img"
              image={`${urlPictures}/${newsItem.result.Photo}`}
              alt="Paella dish"
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "300px", md: "500px" },
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
