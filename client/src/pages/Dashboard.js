import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Card, Typography, CardContent, Link, Button, Box } from '@mui/material'

import { GET_ME } from "../utils/queries"

import SnippetForm from "../components/SnippetForm"

import Auth from "../utils/auth";

const Dashboard = () => {
  //add in me query here
  const { loading, data } = useQuery(GET_ME)

  return (loading) ? <h1>Loading</h1> : (
    <Container>
      <Typography variant="h2" sx={{ textAlign: "center", fontSize: "6ch", m: 1, mb: 4 }}> Welcome, {data.me.username}!</Typography>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: 1, 
        }}
      >
        <SnippetForm />
        <Box sx={{flexGrow: 2}}>
        <Typography variant="h3" sx={{fontSize: "4ch"}}> Your snippets: </Typography>
          <Box sx={{overflow: "auto"}}>
            {data.me.codeSnippets.map(snippet => {
              return (
                <Card sx={{ margin: 2 }}>
                  <CardContent>
                    <Typography color="text.secondary" variant="h5" gutterBottom>
                      {snippet.name} - {snippet.language}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {snippet.description}
                    </Typography>
                    <Typography>
                      {snippet.code}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      Posted on {snippet.date}
                    </Typography>
                    <Link href={`/me/${snippet._id}`}>
                      <Button size="small" sx={{ margin: "auto" }}>Edit</Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Dashboard;