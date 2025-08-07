import { useAuth } from '@/store/AuthProvider';
import { UserProfileType } from '@/types';
import {
  Alert,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const  UserList = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<UserProfileType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.users);
      setUsers(response.data.users)
    } catch (err : unknown) {
      console.error('Error fetching profile:', error);
     if (axios.isAxiosError(err)) {
      setError(err.response?.statusText || 'Failed Login Try Again');
    } else {
      setError('Unexpected error');
    }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ height: '100%', overflowY: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          User Lists
        </Typography>

        {error ? (
          <Alert severity="error" variant="outlined">
            You Are Not Logged In.: {error}
          </Alert>

        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Blood Group</strong>
                </TableCell>
                <TableCell>
                  <strong>Age</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Role</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.bloodGroup}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}
export default UserList;
