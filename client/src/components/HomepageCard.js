import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function HomepageCard() {
  return (
    <Card sx={{margin: 2}}>
      <CardContent>
        <Typography color="text.secondary" variant="h5">
            {/* TO DO: Import props for title, language, and description */}
          Title - Language
        </Typography>
        <Typography variant="body2">
          Lorem ipsum ldfdjflkdj fkjdkfdf kjfkelfjekfdkf dfjdkmmk mkcvk
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{margin: "auto"}}>See full code</Button>
      </CardActions>
    </Card>
  );
}