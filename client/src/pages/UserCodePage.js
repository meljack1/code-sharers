import React from 'react';
import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';

import { SNIPPET_BY_ID } from '../utils/queries';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CodePage() {

  const { id } = useParams()

  const { loading, data } = useQuery(SNIPPET_BY_ID, {
    variables: {
      _id: id
    },
    fetchPolicy: "no-cache",
  });


  return (
    loading ? (<p>Loading</p>) : <Box sx={{ margin: 2 }}>
      <Typography color="text.secondary" variant="h5" gutterBottom>
        {data.snippetById.name} - {data.snippetById.language}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {data.snippetById.description}
      </Typography>
      <Box sx={{ background: "lightGrey", font: "monospace", padding: 1, margin: 1 }}>
        {data.snippetById.code}
      </Box>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Posted on {data.snippetById.createdOn}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Created By: {data.snippetById.userId.username}
      </Typography>
    </Box>
  );
}