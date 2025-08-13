import { FC, useState } from 'react';
import { Alert, Box, Button, Input, Typography } from '@mui/material';
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
      <Typography variant="h3">Sign In</Typography>

      {error ? (
        <Alert severity="error" variant="outlined">
          {error}
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" sx={{ width: '100%', gap: 1, mt: 1 }}>
          <Input
            type="text"
            placeholder="User Name"
            id="username"
            name="username"
            required
            fullWidth
            sx={
              {
                color:'black',
                fontWeight:'900',
              }
            }
          />
          <br />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
            fullWidth
              sx={
              {
                color:'black',
                fontWeight:'900',
              }
            }
          />
          <br />
          {localStorage.getItem('token') ? (
            <Typography variant="body1">{localStorage.getItem('username')}</Typography>
          ) : null}
          <Button type="submit" fullWidth color="secondary" sx={{ bgcolor: '#4f8cff', "&:hover": { bgcolor: "#3a6edc" }, borderRadius: 2, textTransform: "none", fontSize: "1rem", py: 1 }}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
