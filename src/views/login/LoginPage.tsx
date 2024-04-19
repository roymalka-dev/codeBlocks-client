import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoleType, setRole } from "../../store/slices/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (role: RoleType) => {
    dispatch(setRole(role));
    navigate("/loby");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h1" gutterBottom>
        CodeBlocks
      </Typography>
      <Typography variant="body1" gutterBottom>
        Login as
      </Typography>
      <Box>
        <Button
          variant="outlined"
          sx={{ margin: 1, borderRadius: "12px" }}
          onClick={() => handleLogin("OBSERVER")}
        >
          Observer
        </Button>
        <Button
          variant="outlined"
          sx={{ margin: 1, borderRadius: "12px" }}
          onClick={() => handleLogin("USER")}
        >
          User
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
