import React, {useState} from "react";
import { Box, TextField, Button} from "@mui/material"
import { useMutation } from "@apollo/client"

import { UPDATE_SNIPPET } from "../utils/mutations"

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

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                type="submit">
                Update This Snippet
            </Button>
        </Box>
    )
}


export default UpdateSnippetForm