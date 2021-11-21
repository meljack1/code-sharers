import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { Card, Typography, CardContent, Link, Button} from '@mui/material'


import {GET_ME} from "../utils/queries"

import SnippetForm from "../components/SnippetForm"


import Auth from "../utils/auth";


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
                          <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Created By {snippet.userId.username}
                          </Typography>
                          <Link href={`/me/${snippet._id}`}>
                            <Button size="small" sx={{margin: "auto"}}>Edit</Button>
                          </Link>
                        </CardContent>
                      </Card>
                    )
                })}
            </div>
        </>
    )
}

export default Dashboard;