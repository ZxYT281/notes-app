import React, { useContext } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  CircularProgress,
  Switch,
  useTheme,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { ColorModeContext } from "../context/ColorMode";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ancrElem, setAncrElem] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { auth, setAuth } = useAuth();
  const handleMenu = (e) => {
    setAncrElem(e.target.element);
    setMenuOpen(true);
  };
  const colorContext = useContext(ColorModeContext);
  const handleLogout = async (e) => {
    setLoading(true);
    try {
      await axios.post(
        "/auth/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setAuth({});
    } catch (e) {
      if (e?.response?.status === 403) setAuth({});
    }
    setLoading(false);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Notes
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
          <IconButton onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Switch
            checked={theme.palette.mode === "dark" ? true : false}
            onClick={colorContext.toggleColorMode}
          ></Switch>
        </Toolbar>
      </Container>
      <Menu
        anchorEl={ancrElem}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={(e) => {
          setMenuOpen(false);
        }}
      >
        <MenuItem onClick={handleLogout}>
          {!loading ? "Logout" : <CircularProgress />}
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
