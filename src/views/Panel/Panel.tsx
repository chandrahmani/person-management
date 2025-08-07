import { useAuth } from '@/store/AuthProvider';
import { UserProfileType } from '@/types';
import { Alert, Box, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const  Panel = () => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth()

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setProfile(response.data);
      }

      console.log({ response });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: unknown }).message)
          : 'Unknown error'
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {error ? (
        <Alert severity="error">You Are Not Logged In.: {error}</Alert>
      ) : (
        <Box mt={15}>
          <Paper
            elevation={5}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome back,
            </Typography>

            <Typography variant="h5" fontWeight="bold" color="primary">
              Hello {profile ? profile.username : 'Guest'}!
            </Typography>

            <Typography variant="body1" mt={2}>
              This is your profile page.
            </Typography>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default Panel;
 