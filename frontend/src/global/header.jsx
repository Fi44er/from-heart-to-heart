import {
  AppBar,
  Avatar,
  Box,
  Button,
  InputBase,
  Link,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Logo from "/public/Logo.png";
import mobileLogo from "/mobileLogo.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    // Используйте медиа-запрос для скрытия на мобильных устройствах
    display: "none",
  },
}));

const Nav = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 140,
  // left: 290,
  width: "80%",
  height: "45px",
  background: "#C152F0",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "60px",
  paddingRight: "60px",
  [theme.breakpoints.down("lg")]: {
    // Используйте медиа-запрос для скрытия на мобильных устройствах
    display: "none",
  },
}));

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  const menuItems = [
    { text: "О фонде", href: "/" },
    { text: "Проекты", href: "/news" },
    {
      text: "Помочь фонду",
      href: "/#help",
    },
    {
      text: "Обратиться за помощью",
      href: "https://chat.whatsapp.com/I0nXNEzdW885onWh2CBVQ2",
    },
    { text: "Документация", href: "https://disk.yandex.ru/d/Yb6Fo7lEiBjhvA" },
  ];
  return (
    <AppBar position="sticky" sx={{ background: "white", p: 1 }}>
      <StyledToolbar>
        <Box
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          sx={{
            width: {
              xs: "150px",
              sm: "250px",
              md: "max-content",
              cursor: "pointer",
            },
            zIndex: "4",
          }}
        >
          <img style={{ width: "100%" }} src="/Logo.png" alt="" />
        </Box>
        <Nav>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              width: "100%",
              display: { xs: "none", sm: "flex" },
            }}
          >
            {menuItems.map((item) => {
              {
                return (
                  <Link
                    underline="hover"
                    sx={{ ml: 10, mr: 10 }}
                    color="white"
                    href={item.href}
                  >
                    {item.text}
                  </Link>
                );
              }
            })}
          </Breadcrumbs>
        </Nav>
        <Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "block",
                lg: "none",
                color: "#C152F0",
              },
            }}
          >
            <img src="/MenuIcon.svg" />
          </IconButton>
        </Box>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} component="a" href={item.href}>
                  <ListItemText sx={{ color: "#BE1BF7" }} primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </StyledToolbar>
      {/* Burger menu */}
      <Toolbar sx={{ display: { xs: "flex", sm: "none", md: "none" } }}>
        <Box
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          <img style={{ width: "100px" }} src={mobileLogo} alt="Logo" />
        </Box>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{
            display: {
              xs: "block",
              sm: "block",
              md: "none",
              color: "#C152F0",
            },
          }}
        >
          <img src="/MenuIcon.svg" />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component="a" href={item.href}>
                <ListItemText sx={{ color: "#BE1BF7" }} primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
