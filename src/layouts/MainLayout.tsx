import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navbar } from "../components/common/Navbar";

const MainLayout = () => {
  const role = useSelector((state: RootState) => state.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <Box width="100%" height="100%">
      <Navbar />
      <Box padding={{ xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
