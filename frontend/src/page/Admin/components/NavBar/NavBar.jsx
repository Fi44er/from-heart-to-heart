import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import useAuthStore from "../../../../store/authStore";

export default function NavBar() {
  const { Logout } = useAuthStore();

  return (
    <Box
      sx={{
        width: "max-content",
        display: "flex",
        mt: 5,
        mb: 5,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "unset" },
          gridGap: { xs: "10px", lg: "100px" },
          p: 2,
        }}
      >
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/create-news";
          }}
        >
          Добавить новость
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/Admin";
          }}
        >
          Основная панель
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            Logout();
            window.location.href = "/";
          }}
          color="error"
        >
          Выйти
        </Button>
      </Paper>
    </Box>
  );
}
