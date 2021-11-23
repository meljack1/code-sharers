import React from 'react';
import { useParams, Navigate } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER } from '../utils/queries';
import { SNIPPET_BY_ID } from '../utils/queries';
<<<<<<< HEAD
import Auth from '../utils/auth';

import {Typography, Box, Container} from '@mui/material';

=======
import { formatDate } from "../utils/date"


import {Typography, Box, Container} from '@mui/material';
>>>>>>> ea64bf05cbe53c2d23ace36a0c722724f12d9bbf

import UpdateSnippetForm from "../components/UpdateSnippetForm"


export default function CodePage() {
  //Query for data
  const { id, username: userParam } = useParams()
  const { loading, data } = useQuery(SNIPPET_BY_ID, {
    variables: {
      _id: id
    },
    fetchPolicy: "no-cache",
  });

  const {loadingUser, userData } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: {username: userParam}
  });

  // redirect to personal profile page if username is yours
  if (!Auth.loggedIn()  ) {
    return <Navigate to={`/${id}`} />;
  }

  return (
    loading ? (
    <Container sx={{ 
      borderLeft: 1, 
      borderRight: 1, 
      pt: 3, 
      backgroundColor: "white", 
      minHeight: "calc(100vh - 64px)" 
      }}
    >
      <Typography color="text.secondary" variant="h2" sx={{textAlign: "center", mb:4}} gutterBottom>
          Loading...
        </Typography>
    </Container>
      ) : 
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
        <Box sx={{ flexGrow: 2, margin: 2}}>
        <Typography color="text.secondary" variant="h2" sx={{textAlign: "center", mb:4}} gutterBottom>
            Update Snippet Form
        </Typography>

          <UpdateSnippetForm props={data}/>
        </Box>

        <Box sx={{ flexGrow: 2, margin: 2 }}>
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
              Posted on {formatDate(data.snippetById.createdOn)}
            </Typography>
            <Typography sx={{ fontSize: "2.5ch", mx: 1 }} color="text.secondary">
              Language: {data.snippetById.language}
            </Typography>
          </Box>

        </Box>
      </Box>
    </Container>
  );
}