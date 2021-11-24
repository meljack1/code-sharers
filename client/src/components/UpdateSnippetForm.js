import React, {useState} from "react";
import { useParams } from "react-router-dom"
import { Box, TextField, Button} from "@mui/material"
import { useQuery, useMutation } from '@apollo/client';

import { UPDATE_SNIPPET, REMOVE_SNIPPET } from "../utils/mutations"
import { SNIPPET_BY_ID } from '../utils/queries';

import DeleteIcon from '@mui/icons-material/Delete';

function UpdateSnippetForm({props}){
    
    //set our state
    const [_id, set_id] = useState(props.snippetById._id);
    const [name, setName] = useState(props.snippetById.name);
    const [description, setDescription] = useState(props.snippetById.description);
    const [language, setLanguage] = useState(props.snippetById.language);
    const [code, setCode] = useState(props.snippetById.code);

    //use mutation
    const [updateSnippet, {error, data}] = useMutation(UPDATE_SNIPPET);

    const handleInputChange = (event) => {
        const {target} = event;
        const inputType = target.id;
        const inputValue = target.value;

        switch(inputType){
            case "name":
                setName(inputValue);
                break;
            case "description":
                setDescription(inputValue);
                break;
            case "language":
                setLanguage(inputValue);
                break;
            case "code":
                setCode(inputValue);
                break;
            default:
                console.log("Invalid Target")
                return;
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //handle invalid submission
        if(!name || !description || !language || !code){
            return false
        }

        const submission = {
            _id,
            name,
            description,
            language,
            code
        }

        try {
            const {data} = await updateSnippet({
                variables: {input: submission}
            })

            window.location.reload()
        } catch (err){
            console.log(err)
        }
    }

    const { id } = useParams()
    const { loading, snippetData } = useQuery(SNIPPET_BY_ID, {
        variables: {
        _id: id
        },
        fetchPolicy: "no-cache",
    });

  //Add delete mutation
  const [removeSnippet, { removeError }] = useMutation(REMOVE_SNIPPET)
  const handleDelete = async () => {
    const _id = id
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
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '75%' },
                textAlign: 'center',
                flexGrow: 1,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
        >
            <div>
                <TextField
                required
                id="name"
                label="Name"
                placeholder="Name"
                value={name}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                required
                id="description"
                label="Description"
                placeholder="Enter a description of your code here!"
                multiline
                rows={5}
                value={description}
                onChange={handleInputChange}/>
            </div>
            <div>
                <TextField
                required
                id="language"
                label="Language"
                placeholder="Enter the coding language"
                value={language}
                onChange={handleInputChange}/>
            </div>
            <div>
                <TextField
                required
                id="code"
                label="Code"
                placeholder="Enter your code here!"
                multiline
                rows={5}
                value={code}
                onChange={handleInputChange}/>
            </div>
            <Button 
                type="submit"
                variant="contained"
                color="secondary"
                sx={{width: "75%", m:0.5}}>
                Update This Snippet
            </Button>
            <br/>
            <Button 
                variant="contained" 
                color="primary" 
                startIcon={<DeleteIcon />} 
                sx={{width: "75%", m:0.5}}
                onClick={handleDelete}
            >
                Delete this snippet
            </Button>
        </Box>
    )
}


export default UpdateSnippetForm