import * as React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router';

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MAIN_ROUTES } from '../../config/router.config';
import { useNavigate } from 'react-router';
import { useAuth } from '@/store/AuthProvider';
import { routenave } from '@/utils/navroute';

const drawerWidth = 240;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout,  token} = useAuth();
    const navigate = useNavigate();

  const navItems = [...(token ? routenave() : []), ...MAIN_ROUTES];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        RTW
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ path, title, name }) => (
          <ListItem key={name}>
            <Link key={name} to={path}>
              {title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }} mb={8} data-testid="navigation">
      <CssBaseline />
      <AppBar component="nav" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            Nav
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ReactTW
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({ name, title, path }) =>
              token && name === 'login' ? null : (
                <Link
                  key={name}
                  to={path}
                  style={{
                    padding: '0 5px',
                    textDecoration: 'none',
                    fontSize: '18px',
                    color: '#fff',
                  }}
                >
                  {title}
                </Link>
              ),
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <Button style={{ textDecoration: 'none', color: '#fff' }} onClick={handleLogout}>
                Logout
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
