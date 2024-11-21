import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import useAuthStore from "../../../store/authStore";

export default function Auth() {
  const { username, setUsername, password, setPassword, AuthFunc } =
    useAuthStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Проверяем авторизацию
    await AuthFunc(username, password);

    // Очищаем поля ввода
    setUsername("");
    setPassword("");
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        mt: "100px",
        mb: "100px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Авторизация
      </Typography>
      <TextField
        label="Логин"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Пароль"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Войти
      </Button>
    </Box>
  );
}
