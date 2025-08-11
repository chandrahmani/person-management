import { FC } from 'react';
import {Box, Typography} from '@mui/material';


const Landing: FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        margin: 'auto',
      }}>
      <Typography variant="h3" align="center">
        Welcome To The Landing Page
      </Typography>  
    </Box>
  );
};

export default Landing;
