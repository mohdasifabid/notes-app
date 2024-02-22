import { ListBar } from "./ListBar";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../useNote";
import { useAuthProvider } from "../authProvider";
import { SEARCHED_NOTE } from "./noteActionTypes";
import { LOGIN_STATUS, SIGNUP_STATUS } from "./authActionTypes";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];
export const Navbar = () => {
  const { state, dispatch } = useNote();
  const navigate = useNavigate();
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // const container = window !== undefined ? () => window().document.body : undefined;
  return (
    // <div className="duck-navbar-container">
    //   <div className="navbar-listbar-brand">
    //     <ListBar />
    //     <Link to="/" className="duck-navbar-brand duck-navbar-item">
    //       duckNotes
    //     </Link>
    //   </div>
    //   <div>
    //     <input
    //       style={state.needSearchInput ? {} : { display: "none" }}
    //       id="navbarSearchInput"
    //       className="navbar-search-input"
    //       placeholder="search note"
    //       onChange={(e) =>
    //         dispatch({ type: SEARCHED_NOTE, payload: e.target.value })
    //       }
    //     />
    //   </div>
    //   {authState.isLoggedIn ? (
    //     <span
    //       className="navbar-login"
    //       onClick={() => {
    //         authDispatch({ type: LOGIN_STATUS, payload: false });
    //         authDispatch({ type: SIGNUP_STATUS, payload: false });
    //         localStorage.removeItem("encodedToken");
    //         localStorage.removeItem("currentUser")
    //       }}
    //     >
    //         Logout
    //     </span>
    //   ) : (
    //     <span className="navbar-login" onClick={() => navigate("/login")}>
    //       Login
    //     </span>
    //   )}
    // </div>
    <nav>

      <Box sx={{ textAlign: 'center', display: "flex", justifyContent: "space-between", background: "#1776d2", color: "white" }}>
        <Typography variant="h6" sx={{ my: 2, paddingLeft: "1rem" }}>
          Notes App 
        </Typography>
        <Divider />
        <List sx={{ display: "flex" }}>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center', }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </nav>
  );
};
