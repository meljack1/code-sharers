import React from 'react';
import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';

import { SNIPPET_BY_ID } from '../utils/queries';

import {Typography, Box, Container, Card, CardContent, CircularProgress, Divider, Button, Link} from '@mui/material/';

import CommentForm from "../components/CommentForm"
import Auth from '../utils/auth';

import { formatDate } from "../utils/date"

export default function CodePage() {

  const { id } = useParams()

  const { loading, data } = useQuery(SNIPPET_BY_ID, {
    variables: {
      _id: id
    },
    fetchPolicy: "no-cache",
  });
  
  return (
    loading ? (
    <Container sx={{ textAlign: "center", borderLeft: 1, borderRight: 1, pt: "calc(10vh + 64px)", backgroundColor: "white", minHeight: "100vh" }}>
      <CircularProgress />
    </Container>
      ) : 
    <Container sx={{ 
      borderLeft: 1, 
      borderRight: 1, 
      pt: "85px", 
      backgroundColor: "white", 
      minHeight: "100vh"
     }}>
      <Box sx={{ m: 2, mx: "auto", width: "85%" }}>
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
            Posted on {formatDate(data.snippetById.createdOn)}
          </Typography>
          <Typography sx={{ fontSize: "2.5ch" }}>
            Language: {data.snippetById.language}
          </Typography>
          <Typography sx={{ fontSize: "2.5ch" }} color="text.secondary">
            Created By: {data.snippetById.userId.username}
          </Typography>

        </Box>
        
        {Auth.loggedIn() ? <CommentForm/> : (
          <Box sx={{mb: 6, mt: 6}}>
            <Divider />
            <Typography sx={{ fontSize: "3ch", mt: 3, mb: 1 }}>
              You must be logged in to leave a comment.
            </Typography>
          </Box>
        )}

        <Box>
        {data.snippetById.comments.map((comment)=> {
            return(
            <Card variant={"outlined"}>
              <CardContent>
                <Typography sx={{ fontSize: "2.5ch" }} color="text.secondary">
                  User {comment.commentAuthor} posted: 
                </Typography>
                <Typography sx={{ fontSize: "3ch", m: 1 }}>
                  {comment.commentText} 
                </Typography>
                <Typography sx={{ fontSize: "2.5ch" }} color="text.secondary">
                  At: {formatDate(comment.commentDate)} 
                </Typography>
              </CardContent>
            </Card>
            )
          })}
        </Box>
      </Box>
    </Container>
  );
}