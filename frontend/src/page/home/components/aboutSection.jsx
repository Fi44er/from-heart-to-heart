import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { GlobalButton } from "../../../theme/theme";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <Box sx={{ mt: 4, position: "relative" }}>
      <Helmet>
        <title>О фонде - Благотворительный фонд помощи</title>
        <meta
          name="description"
          content="Благотворительный фонд с 2017 года, помогающий более 500 горожанам из Оренбуржья. Узнайте о нашей работе и скачайте документы."
        />
        <meta
          name="keywords"
          content="благотворительность, фонд, помощь, волонтеры, Оренбуржье"
        />
      </Helmet>
      <Box
        sx={{
          position: "absolute",
          top: 65,
          left: -50,
          width: { xs: 100, sm: 100, md: 200, lg: 300 },
          height: { xs: 100, sm: 100, md: 200, lg: 300 },
          backgroundColor: "#F7F01B",
          opacity: 0.2,
          zIndex: 0,
          transform: "rotate(45deg)",
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
          top: 0,
          right: 0,
          width: { xs: 100, sm: 100, md: 200, lg: 300 },
          height: { xs: 100, sm: 100, md: 200, lg: 300 },
          borderRadius: "50%",
          backgroundColor: "#D46EFF",
          opacity: 0.2,
          zIndex: -10,
        }}
      ></Box>
      <Container sx={{ zIndex: 10 }}>
        <Typography variant="h3">О фонде</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5,
            flexDirection: { xs: "column", sm: "unset " },
            gridGap: { xs: 20, lg: "100px" },
            zIndex: 100,
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <Typography variant="h5" component="p">
              Благотворительный фонд с 2017года объединяет людей, желающих
              помогать и тех, кому нужна помощь. Силами партнёров и волонтёров
              фонд помогает людям справиться с жизненными трудностями. Ежегодно
              мы оказываем поддержку более чем 500 горожанам из двух населенных
              пунктов Оренбуржья. Волонтеры фонда принимают и сортируют около 30
              тонн одежды в год, раздают более 2500 порций еды.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gridGap: 25,
                mt: 10,
              }}
            >
              <Typography variant="h5" color="textSecondary" component="p">
                Сертификат о разрешение на работу фонда можно скачать ниже
              </Typography>
              <GlobalButton
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    "https://disk.yandex.ru/d/Yb6Fo7lEiBjhvA";
                }}
              >
                Документы фонда
              </GlobalButton>
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "70%" } }}>
            <Paper>
              <video
                width="100%"
                height="400px"
                src="/public/phond.mp4"
                aria-label="Видео о работе фонда"
                controls
              ></video>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
