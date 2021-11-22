import React from 'react';
import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';

import { SNIPPET_BY_ID } from '../utils/queries';
import {Typography, Box, Container} from '@mui/material/';

export default function CodePage() {

  const { id } = useParams()

  const { loading, data } = useQuery(SNIPPET_BY_ID, {
    variables: {
      _id: id
    },
    fetchPolicy: "no-cache",
  });

  return (
    loading ? (<p>Loading</p>) : 
    <Container sx={{ borderLeft: 1, borderRight: 1, pt: 3, backgroundColor: "white", minHeight: "calc(100vh - 64px)" }}>
      <Box sx={{ margin: 2 }}>
        <Typography color="text.secondary" variant="h2" sx={{textAlign: "center"}} gutterBottom>
          {data.snippetById.name} 
        </Typography>
        <Typography sx={{ fontSize: "3ch" }} gutterBottom>
          {data.snippetById.description}
        </Typography>
        <Box sx={{ background: "lightGrey", fontSize: "2.5ch", fontFamily: "Courier", fontWeight: "bold", padding: 3, margin: 2 }}>
          {data.snippetById.code}
        </Box>
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: 'row', 
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          <Typography sx={{ fontSize: "2.5ch" }} color="text.secondary">
            Posted on {data.snippetById.createdOn}
          </Typography>
          <Typography sx={{ fontSize: "2.5ch" }} color="text.secondary">
            Language: {data.snippetById.language}
          </Typography>
          <Typography sx={{ fontSize: "2.5ch" }} color="text.secondary">
            Created By: {data.snippetById.userId.username}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}