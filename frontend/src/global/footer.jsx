import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { GlobalButton } from "../theme/theme";
import Tg from "/telegram-svgrepo-com (1) 1.png";

export default function Footer() {
  return (
    <Box>
      <Box
        sx={{
          background: "#D46EFF",
          display: "flex",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "space-between",
              lg: "space-between",
            },
            pt: "50px",
            pb: "50px",
            gridGap: "100px",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "unset",
              lg: "unset",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gridGap: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gridGap: 10,
                color: "#fff",
              }}
            >
              <img src="/Vector.png" alt="" />
              <Link
                href="https://yandex.ru/maps/11090/novotroitsk/house/ulitsa_frunze_4/YUEYdQZiTEcHQFtrfX14dX9mZQ==/?ll=58.312520%2C51.194352&z=17"
                variant="h5"
                sx={{ color: "white", textDecoration: "none" }}
              >
                Оренбургская обл г. Новотроицк улица Фрунзе дом 4
              </Link>
            </Box>
            <Typography variant="h5" sx={{ color: "#fff" }}>
              +7 (3537) 66-00-01
            </Typography>
            <Box>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://vk.com/club211949357";
                }}
              >
                <img src="/VK Logo.png" />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://t.me/fromheart56";
                }}
              >
                <img src="/telegram-svgrepo-com (1) 1.png" alt="" />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", lg: "33%" },
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "flex-start",
                lg: "flex-start",
              },
              alignItems: {
                xs: "center",
                sm: "center",
                md: "flex-start",
                lg: "flex-start",
              },
              gridGap: "30px",
            }}
          >
            <GlobalButton
              onClick={(e) => {
                window.location.href = "/#help";
              }}
              sx={{ backgroundColor: "#F324FE", fontSize: "18px" }}
            >
              Нужна помощь
            </GlobalButton>
            <Link
              sx={{ color: "#fff", textDecoration: "none", cursor: "pointer" }}
              href="/"
            >
              О фонде
            </Link>
            <Link
              sx={{ color: "#fff", textDecoration: "none", cursor: "pointer" }}
              href="/news"
            >
              Новости
            </Link>
            <Link
              sx={{ color: "#fff", textDecoration: "none", cursor: "pointer" }}
            >
              Документация
            </Link>
          </Box>
          <Box
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "flex-start",
                lg: "flex-start",
              },
              alignItems: {
                xs: "center",
                sm: "center",
                md: "flex-start",
                lg: "flex-start",
              },
            }}
          >
            <img src="/Group 25.png" alt="Logo" />
          </Box>
        </Container>
      </Box>
      <Box sx={{ background: "#D98EF9" }}>
        <Container>
          <Typography
            sx={{
              color: "#fff",
              height: 40,
              display: "flex",
              alignItems: "center",
            }}
          >
            @2024 БФ "От сердца к сердцу".Все права защищены.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
