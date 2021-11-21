import React from 'react';
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client';

import { SNIPPET_BY_ID } from '../utils/queries';
import { REMOVE_SNIPPET } from "../utils/mutations"

import {Typography, Button, Box} from '@mui/material';
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

  //Add delete mutation
  const [removeSnippet, { error }] = useMutation(REMOVE_SNIPPET)
  const handleDelete = async () => {
    const _id = id
    console.log(_id)
    try {
      const {data} = await removeSnippet({
        variables: {_id} 
      })

      if(!data) {
        throw new Error ("something went wrong")
      }
      window.location.pathname ="/me"
    }catch(err) {
      console.error(err)
    }
  }

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

      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>
        Delete
      </Button>

      <Typography color="text.secondary" variant="h5" gutterBottom>
        Update Snippet Form
      </Typography>

      <UpdateSnippetForm props={data}/>

    </Box>
  );
}