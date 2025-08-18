import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

interface ImageSliderProps {
  images: string[];
  interval?: number; // fixed typo and added property
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [current, interval]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <img
        src={images[current]}
        alt={`slide-${current}`}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          display: 'block',
          transition: '0.5s ease-in-out',
        }}
      />
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 10,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.4)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
        
      </IconButton>
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 10,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.4)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
      
      </IconButton>
    </Box>
  );
};

export default ImageSlider;
