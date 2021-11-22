import React from 'react';
import { Link, Divider, Card, CardContent, Typography, Box } from "@mui/material"

export default function HomepageCard(props) {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '5px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" variant="h5" gutterBottom>
          <Link href={`/${props._id}`}>{props.name}</Link> 
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.description}
        </Typography>
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: 'row', 
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            By User: {props.userId.username}
          </Typography>
          <Typography>
            {bull}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Language: {props.language}
          </Typography>
          <Typography>
            {bull}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Date posted: {props.createdOn}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
}