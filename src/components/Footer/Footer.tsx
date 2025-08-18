
import { Box, Button, Container, Grid, InputBase, Stack, Typography} from '@mui/material';
import { useNavigate } from 'react-router';

function Footer() {

  const navigate = useNavigate()
	return (
		// <Box
		// 	component="footer"
		// 	sx={{
		// 		backgroundColor: (theme) =>
		// 			theme.palette.mode === 'light'
		// 				? theme.palette.grey[200]
		// 				: theme.palette.grey[800],
		// 		py: 3,
		// 		mt: 'auto', // Push footer to the bottom of the page
		// 	}}
		// >
		// 	<Container maxWidth="lg">
		// 		<Typography variant="body1" align="center">
		// 			&copy; {new Date().getFullYear()} Powered By: <a href="https://webtechpie.com/" target='_blank'>Webtechpie.com</a>
		// 		</Typography>
		// 	</Container>
		// </Box>
		<Box component="footer" sx={{ py: 6, bgcolor: "background.paper", borderTop: 1, borderColor: "divider" }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Person Management</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>Get training tips, product launches, and travel deals.</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <InputBase placeholder="Your email" sx={{ px: 2, py: 1, border: 1, borderColor: "divider", borderRadius: 2, flex: 1 }} />
                <Button variant="contained">Subscribe</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" justifyContent={{ xs: "flex-start", md: "flex-end" }} spacing={3}>
                <Button onClick={() => navigate('/about')}>About</Button>
                <Button onClick={() => navigate('/contact')}>Contact</Button>
                <Button>Privacy</Button>
              </Stack>
              
            </Grid>
          </Grid>
     
        </Container>
      </Box>
      
	);
}

export default Footer;