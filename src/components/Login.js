import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import images from '../images/cafe_frontpage.png';
import Paper from '@mui/material/Paper';


const theme = createTheme();

export const Login = () => {

const handleSubmit = async e => {
    e.preventDefault();

    const fields = new FormData(e.currentTarget);
    const user = {
        username: fields.get('username'),
        password: fields.get('password')
      };
    
    console.log(user);

    const {data} = await axios.post('http://localhost:8002/token/', user ,{headers: {
        'Content-Type': 'application/json'
    }}, {withCredentials: true});

    console.log(data)
    localStorage.clear();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    // axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
    console.log(data['access']);
    window.location.href = '/tasks';
}

const styles = {
  paperContainer: {
      backgroundImage: `url(${images})`,
  }
};

  return (
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        }}
        maxWidth={false}
        disableGutters
        >
        <CssBaseline />
      <Paper style={styles.paperContainer}>
      <Container sx={{display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            alignItems: 'center',
            minHeight:"93vh",
            }}
            maxWidth={false} disableGutters >
        
        <Box
          sx={{
            pb: 0,
            width: "500px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            alignItems: 'center',
            backgroundColor:"#f5f5f5",
            opacity: 0.9,
            mt:9,
            mb:9
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: 'warning.main' }}>
            <SelfImprovementIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mx: 5,}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 5 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      </Paper>
      </Container>

  );
}