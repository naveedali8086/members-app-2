import React from "react";
import { Button, Stack, ButtonGroup ,useMediaQuery, useTheme } from "@mui/material";
import {useNavigate} from "react-router-dom"
import { Usecontext } from "../Context/Context";



const Header = () => {
    const {logout , isAuthenticated} = Usecontext()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonSize = isSmallScreen ? 'small' : 'large';
    const navigate = useNavigate()
    const handleLandingPge = ()=>{
        navigate('/')
    }
    const handleAccout = ()=>{
        navigate('/accounts')
    }
  return (
    <main className="sticky top-[1px] shadow-lg">
      <nav className="w-[100%] py-2 sm:py-4 px-10 bg-header flex items-center justify-between">
        <img className="cursor-pointer w-[8rem] sm:w-[12rem] " src="/LOGO.png"  alt="" onClick={handleLandingPge } />

        <Stack>
          <ButtonGroup
            variant="outlined"
            size={buttonSize}
            orientation="horizontal"
            color="info"
            // disableElevation
            aria-label="alignment group button"
          >
           {
            !isAuthenticated && <Button onClick={handleAccout}>ACCOUT</Button>
           } 
            <Button onClick={logout}>LOGOUT</Button>
          </ButtonGroup>
        </Stack>
      </nav>
    </main>
  );
};

export default Header;
