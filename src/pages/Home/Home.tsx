import type { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useAuthStore from "@/stores/authStore";

const Home: FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Box>
      <Typography>Home</Typography>
      <Typography>Hello, {user?.email}!</Typography>
    </Box>
  );
};

export default Home;
