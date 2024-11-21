import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

import Header from "./global/header";
import Home from "./page/home/home";
import News from "./page/news/news";
import NewsDynamicPage from "./page/news/newsDynamicPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/routersTree/routersTree";
import Footer from "./global/footer";

function App() {
  return (
    <Box>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </Box>
  );
}

export default App;
