import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCommentAsync } from "../../redux/projects/projectCommentThunks";
import { unwrapResult } from '@reduxjs/toolkit';

import { FormControl, Input, Flex, Image, Button } from '@chakra-ui/react'

export default function PostCommentForm({ project, addComment }) {

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [commentBody, setCommentBody] = useState("");

    const handleInputChange = (e) => {
        setCommentBody(e.target.value);
    };

    const handleSubmit = async () => {
        if (!currentUser) {
            alert("Error fetching user profile");
            return;
        }

        const newComment = {
            postedBy: currentUser.githubUsername,
            commenterProfileImage: currentUser.userImage,
            datePosted: new Date(),
            commentBody: commentBody
        };

        try {
            dispatch(addCommentAsync({ projectID: project.projectID, comment: newComment }));
            addComment(newComment);
            setCommentBody("");
        } catch (error) {
            console.log("Failed to post comment:", error);
        }
    };

    return (
        <Flex direction='column' pt='10px' pl='20px'>
            <Flex>
                <Image src={currentUser ? currentUser.userImage : ""} width='10%' pr='10px'/>
                <FormControl>
                    <Input 
                        height='100%' 
                        placeholder='Write a comment...' 
                        _placeholder={{ textAlign: 'start', lineHeight: '100%' }} 
                        justifyItems='start'
                        onChange={handleInputChange}
                        value={commentBody}/>
                </FormControl>
            </Flex>
            <Button 
                colorScheme="teal" 
                fontWeight='bold' 
                width='10%' 
                ml='auto' 
                mt='5px' 
                onClick={handleSubmit}
                >Comment
            </Button>
        </Flex>
    )
}