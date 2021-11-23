import React, {useState} from "react";
import { Box, TextField, Button, Typography, InputLabel, MenuItem, Select } from "@mui/material"
import { useMutation } from "@apollo/client"

import { SAVE_SNIPPET } from "../utils/mutations"



function SnippetForm(){
    //Set our state
    const [input, setValues] = useState({
        name: "",
        description: "",
        language: "",
        code: ""
    }); 

    //Use mutation
    const [saveSnippet, {error, data}] = useMutation(SAVE_SNIPPET);

    const handleInputChange = (prop) => (event) => {
        setValues({ ...input, [prop]: event.target.value });
    };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //handle invalid submission
        if(!input.name || !input.description || !input.language || !input.code){
            return false
        }

        const submission = {
            name: input.name,
            description: input.description,
            language: input.language,
            code: input.code
        }

        try {
            const {data} = await saveSnippet({
                variables: {input: submission}
            })
        } catch (err){
            console.log(err)
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '75%' },
                flexGrow: 1,
                textAlign: 'center',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
        >
            <Typography variant="h3" sx={{ mb: 4}}> Create a new snippet: </Typography>
            <div>
                <TextField
                required
                id="name"
                label="Snippet Name"
                placeholder="Name"
                onChange={handleInputChange("name")}
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
                onChange={handleInputChange("description")}/>
            </div>
            <div>
                <TextField
                required
                id="language"
                label="Language"
                placeholder="Enter the coding language"
                onChange={handleInputChange("language")}/>
            </div>
            <div>
                <TextField
                required
                id="code"
                label="Code"
                placeholder="Enter your code here!"
                multiline
                rows={5}
                onChange={handleInputChange("code")}/>
            </div>
            <Button 
                type="submit"
                variant="contained"
                color="secondary"
                sx={{width: '75%', m: 1}}>
                Save Snippet
            </Button>
        </Box>
    )
}

export default SnippetForm