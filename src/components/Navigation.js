import React, { useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export function Navigation() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      if (localStorage.getItem('access_token') !== null) {
         setIsAuth(true); 
       }
     }, );

     
    return ( 

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
            <Toolbar >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Tasks Project
                </Typography>
                {isAuth ? <Button color="inherit" href="/tasks">Home</Button> : null}
                {isAuth ? <Button color="inherit" href="/logout">Logout</Button> : <Button color="inherit" href="/login">Login</Button>}
            </Toolbar>
            </AppBar>
        </Box>
    );
 }