import React, {useState} from "react";
import { Box, TextField, Button, Typography} from "@mui/material"
import { useMutation } from "@apollo/client"

import { SAVE_SNIPPET } from "../utils/mutations"



function SnippetForm(){
    //Set our state
    const [name, setName] =  useState("");
    const [description, setDescription] =  useState("");
    const [language, setLanguage] =  useState("");
    const [code, setCode] = useState("");

    //Use mutation
    const [saveSnippet, {error, data}] = useMutation(SAVE_SNIPPET);

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
            name,
            description,
            language,
            code
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
            <Typography variant="h3" sx={{fontSize: "4ch"}}> Create a new snippet: </Typography>
            <div>
                <TextField
                required
                id="name"
                label="Snippet Name"
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
                Save Snippet
            </Button>
        </Box>
    )
}

export default SnippetForm