import type { FC } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "@tanstack/react-router";

import router from "./router";

import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
