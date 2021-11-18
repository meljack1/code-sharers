import React, {useState} from "react";
import { useMutation, useQuery} from "@apollo/client";

import SnippetForm from "./SnippetForm"


import Auth from "./utils/auth";

const Dashboard = () => {
    //add in me query here
    const {loading, data} = useQuery()
    const userData = data?.me || {}
    if (loading){
        return <h1>Please wait while the page loads.</h1>
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        //Code here for submitting 
    }


    return (
        <>
            <SnippetForm/>
        </>
    )
}

export default Dashboard;