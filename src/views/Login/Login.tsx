import { FC, useState } from 'react';
import { Alert, Box, Button, Input, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '@/store/AuthProvider';
import { useNavigate } from 'react-router';


const Login: FC = () => {
  const { setToken } = useAuth();

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    try {
      const response = await axios.post('/api/auth/login', payload , { timeout: 1000 });

      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        setToken(response.data.access_token);
        navigate('/panel');
      } else {
        
        setError('No token received, please try again.');
      }
      console.log('Response:', response.data.data);
    } catch (error) {
      console.error('Error during form submission:', error);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.statusText || 'Failed Login Try Again');
      } else {
        setError('Failed Login Try Again');
      }
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        margin: 'auto',
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h3">Sign In</Typography>

      {error ? (
        <Alert severity="error" variant="outlined">
          {error}
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column">
          <Input
            type="text"
            placeholder="User Name"
            id="username"
            name="username"
            required
            fullWidth
          />
          <br />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
            fullWidth
          />
          <br />
          {localStorage.getItem('token') ? (
            <Typography variant="body1">{localStorage.getItem('username')}</Typography>
          ) : null}
          <Button type="submit" fullWidth color="secondary" sx={{ bgcolor: 'grey' }}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
