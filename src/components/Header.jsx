import React, { useState } from "react";
import {
  Button,
  Stack,
  ButtonGroup,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { useNavigate } from "react-router-dom";
import { Usecontext } from "../Context/Context";

const Header = () => {
  const { logout, isAuthenticated } = Usecontext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Users")
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "large";
  const navigate = useNavigate();
  const handleLandingPage = () => {
    navigate("/");
    setSelectedMenuItem('Dashboard')
  };
  const handleUsers = () => {
    navigate("/users");
    setSelectedMenuItem('Users')

  };
  const handleAccount = () => {
    navigate("/account");

  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <main className="sticky top-[1px] shadow-lg z-50">
      <nav className="w-[100%] py-2 sm:py-4 px-2 sm:px-10 bg-[#162235] flex items-center justify-between">
        <img
          className="cursor-pointer w-[8rem] sm:w-[12rem] "
          src="/logo.png"
          alt=""
        />

        <Stack>
          <ButtonGroup
            variant="outlined"
            size={buttonSize}
            orientation="horizontal"
            color="info"
            aria-label="alignment group button"
          >
            {isAuthenticated ? (
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} 
                >
                  {selectedMenuItem}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleLandingPage();
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleUsers();
                    }}
                  >
                    Users
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button onClick={handleAccount}>Login</Button>
            )}
          </ButtonGroup>
        </Stack>
      </nav>
    </main>
  );
};

export default Header;
