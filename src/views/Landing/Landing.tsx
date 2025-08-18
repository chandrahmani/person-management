import { FC } from 'react';
import { AppBar, Box, Button, Divider, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { useNavigate } from 'react-router';



const images = [
  {
    img: 'https://luisfalemanjr.com/wp-content/uploads/2025/07/The-Power-of-Clear-Communication-in-Strategic-Consulting-scaled.jpg',
  },
  {
    img: 'https://images.squarespace-cdn.com/content/v1/5ac7312b4eddec127d5b99ec/1588434321832-G3JBF1N2IG6USGVGTEY6/image-asset.jpeg?format=2500w',
  },
  {
    img: 'https://media.licdn.com/dms/image/v2/D5612AQHam1KIqGK7tg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1723224547791?e=2147483647&v=beta&t=lp96AbP-yVGKFdz2wxkHl50l03Z1nx-1LNBLxzosKEA',
  },
];

const Landing: FC = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      {/* Top AppBar */}
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton edge="start" aria-label="menu">

          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
            Welcome
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            px: 1,
            border: 1,
            borderColor: "divider",
            borderRadius: 2
          }}>

            <InputBase placeholder="Search user, guides…" sx={{ ml: 1, width: 280 }} />
          </Box>
          <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
        </Toolbar>
      </AppBar>
      <ImageSlider images={images.map((image) => image.img)} />
      <Divider />
    </Box>
  );
};

export default Landing;
