import React, {useState} from "react";
import { Box, TextField} from "@mui/material"


function Form(){
    const [name, setName] =  useState("");
    const [description, setDescription] =  useState("");
    const [language, setLanguage] =  useState("");
    const [code, setCode] = useState("");

    const handleInputChange = (event) => {
        const {target} = event;
        const inputType = target.id;
        const inputValue = target.value;

        switch(inputType){
            case name:
                setName(inputValue);
                break;
            case description:
                setDescription(inputValue);
                break;
            case language:
                setLanguage(inputValue);
                break;
            case code:
                setCode(inputValue);
                break;
            default:
                return;
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
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
                id="langauge"
                label="Language"
                placeholder="Language"
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
        </Box>
    )
}

export default Form