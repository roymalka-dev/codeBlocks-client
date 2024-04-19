import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole } from "../../store/slices/userSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoleSwitch = () => {
    dispatch(setRole(null));
    navigate("/");
  };

  const navigateToLobby = () => {
    navigate("/loby");
  };

  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="Switch Role"
        icon={<PeopleAltIcon />}
        onClick={handleRoleSwitch}
      />
      <BottomNavigationAction
        label="Loby"
        icon={<HomeIcon />}
        onClick={navigateToLobby}
      />
    </BottomNavigation>
  );
};

export default Navbar;
