import React, {useState} from "react";
import { useMutation, useQuery} from "@apollo/client";
import { Card, Typography, CardContent} from '@mui/material/Card'


'@mui/material/Typography'

import {GET_ME} from "./utils/queries"

import SnippetForm from "./SnippetForm"


import Auth from "./utils/auth";
import { Typography } from "@mui/material";

const Dashboard = () => {
    //add in me query here
    const {loading, data} = useQuery(GET_ME)
    const userData = data?.me || {}
    const {snippets} = userData

    if (loading){
        return <h1>Please wait while the page loads.</h1>
    }

    return (
        <>
            <SnippetForm/>
            <div>
                {snippets.map(snippet => {
                    return (
                        <Card sx={{margin: 2}}>
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
                        </CardContent>
                      </Card>
                    )
                })}
            </div>
        </>
    )
}

export default Dashboard;