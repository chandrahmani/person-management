import { FC, useState } from 'react';
import { Alert, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Input, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '@/store/AuthProvider';
import { useNavigate } from 'react-router';
import { loginUser } from '@/services/app.services';


const Login: FC = () => {
  const { setToken } = useAuth();

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = String(formData.get('username'));
    const password = String(formData.get('password'));
    try {
      const response = await loginUser(username, password);
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('username', username);
        setToken(response.access_token);
        navigate('/panel');
      } else {
        setError('No token received, please try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.statusText || 'Failed Login Try Again');
      }
    }
  };

  return (
    <Box
         sx={{
        height: "80vh",
        margin: 'auto',
        width:'400px',
      }}
    >
      <Typography variant="h4" sx={{pt:"2rem"}}>Login In</Typography>
      {error ? (
        <Alert severity="error" variant="outlined">
          {error}
        </Alert>
      ) : null}

       <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
              background: "#e2e0e0ff",
              borderRadius :"5px",
              p: '2rem',
              mt: "2rem"
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">User Name</FormLabel>
              <TextField
                id="username"
                type="username"
                name="username"
                placeholder="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                // color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
           {localStorage.getItem('token') ? (
            <Typography variant="body1">{localStorage.getItem('username')}</Typography>
          ) : null}
          <Button type="submit" fullWidth color="secondary" sx={{ bgcolor: '#4f8cff', "&:hover": { bgcolor: "#3a6edc" }, borderRadius: 2, textTransform: "none", fontSize: "1rem", py: 1 }}>
            Login
          </Button>
          </Box>
    </Box>
  );
};

export default Login;
