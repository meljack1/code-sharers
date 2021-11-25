import React , { useState } from "react";
import { Box, TextField, Button, Typography, Divider} from "@mui/material"
import { useParams } from "react-router-dom"
import { useMutation } from "@apollo/client"

import { ADD_COMMENT } from "../utils/mutations"

function CommentForm(){
    //set state
    const [commentText, setCommentText] = useState("")
    //manage state change
    const handleInputChange = (event) => {
        setCommentText(event.target.value)
    }

    //Use mutation
    const [addComment, {error, data}] = useMutation(ADD_COMMENT);

    //get the snippet id
    const { id } = useParams()

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(!commentText){
            return false
        }

        try {
            const { data } = await addComment({
                variables: { _id: id, commentText}
            })
            setCommentText("");
            window.location.reload()
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
                flexGrow: 1,
                textAlign: 'center',
                mt: 6, 
                mb: 6
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
        >
            <Divider/>
            <Typography variant="h4" sx={{ mt: 3, mb: 1, fontSize: 26, textAlign: "left" }}> Add Your Comment: </Typography>
            <div>
            <TextField
                required
                id="commentText"
                label="Comment Text"
                placeholder="Your comment here"
                multiline
                rows={3}
                value={commentText}
                onChange={handleInputChange}
                />
            </div>
            <Button 
                type="submit"
                variant="contained"
                color="secondary"
                sx={{width: '100%', m: 1}}>
                Save Comment
            </Button>
        </Box>
    )
}

export default CommentForm