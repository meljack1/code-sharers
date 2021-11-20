import React from 'react';
import { useQuery } from '@apollo/client';
import { SNIPPET_BY_ID } from '../utils/queries';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CodePage() {
    const { loading, data } = useQuery(SNIPPET_BY_ID, {
        variables: {
          _id: "6198c37c0fe2d22494e9dfb3"
        },
        fetchPolicy: "no-cache",
    });

    const snippet = data?.snippetById || {};

  return (
    <Box sx={{margin: 2}}>
      <Typography color="text.secondary" variant="h5" gutterBottom>
        {snippet.name} - {snippet.language}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {snippet.description}
      </Typography>
      <Box sx={{ background: "lightGrey", font: "monospace", padding: 1, margin: 1}}>
        {snippet.code}
      </Box>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Posted on {snippet.createdOn}
      </Typography>
  </Box>
  );
}