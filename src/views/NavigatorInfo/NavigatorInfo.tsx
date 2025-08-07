import {Card, CardContent, List, ListItem, Typography, } from '@mui/material';

// import products from '../../mocks/data/products.json'

// type NavigatorInfo = {
  
// };

const  NavigatorInfo = () => {

const getNavigatorInfo = () => ({
  AppName: navigator.appName,
  AppVersion: navigator.appVersion,
  UserAgent: navigator.userAgent,
  Language: navigator.language,
  Platform: navigator.platform,
  Online: navigator.onLine ? navigator.onLine.toString() : 'offLine',
  CookieEnabled: navigator.cookieEnabled ? 'true' : 'false',
});


  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography>
          Navigator Information
        </Typography>
        <List>
          {Object.entries(getNavigatorInfo()).map(([key, value]) => (
            <ListItem key={key}>
              <Typography variant="body2" color="textSecondary">
                {key}: {value}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default NavigatorInfo;
 