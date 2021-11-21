import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from "@mui/material"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function HomepageCard(props) {
  return (
    <Card sx={{margin: 2}}>
      <CardContent>
        <Typography color="text.secondary" variant="h5" gutterBottom>
          {props.name} - {props.language}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {props.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Posted on {props.createdOn}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          By User: {props.userId.username}
        </Typography>
      </CardContent>
      <CardActions sx={{background: "lightGrey"}}>
        <Link href={`/${props._id}`}>
          <Button size="small" sx={{margin: "auto"}}>See full code</Button>
        </Link>
      </CardActions>
    </Card>
  );
}