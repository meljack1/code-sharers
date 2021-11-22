import React from 'react';
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client';

import { SNIPPET_BY_ID } from '../utils/queries';
import { REMOVE_SNIPPET } from "../utils/mutations"

import {Typography, Button, Box, Container} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import UpdateSnippetForm from "../components/UpdateSnippetForm"


export default function CodePage() {
  //Query for data
  const { id } = useParams()
  const { loading, data } = useQuery(SNIPPET_BY_ID, {
    variables: {
      _id: id
    },
    fetchPolicy: "no-cache",
  });

  return (
    loading ? (<p>Loading</p>) : 
    <Container sx={{ 
      borderLeft: 1, 
      borderRight: 1, 
      pt: 3, 
      backgroundColor: "white", 
      minHeight: "calc(100vh - 64px)" 
      }}
    >
      <Box 
          sx={{ 
            display: "flex", 
            flexDirection: 'row', 
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            margin: 1, 
          }}
      >
        <Box sx={{flexGrow: 2, margin: 2}}>
        <Typography color="text.secondary" variant="h2" sx={{textAlign: "center", mb:4}} gutterBottom>
            Update Snippet Form
          </Typography>

          <UpdateSnippetForm props={data}/>
        </Box>

        <Box sx={{ margin: 2 }}>
          <Typography color="text.secondary" variant="h2" sx={{textAlign: "center", mb:4}} gutterBottom>
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
            <Typography sx={{ fontSize: "2.5ch", mx: 1 }} color="text.secondary">
              Posted on {data.snippetById.createdOn}
            </Typography>
            <Typography sx={{ fontSize: "2.5ch", mx: 1 }} color="text.secondary">
              Language: {data.snippetById.language}
            </Typography>
            <Typography sx={{ fontSize: "2.5ch", mx: 1 }} color="text.secondary">
              Created By: {data.snippetById.userId.username}
            </Typography>
          </Box>

        </Box>
      </Box>
    </Container>
  );
}