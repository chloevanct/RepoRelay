import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCommentAsync } from "../../redux/projects/projectCommentThunks";
import { sanitizeCommentBody, validateCommentBody } from '../../utils/sanitization'; 

import { FormControl, Input, Flex, Image, Button, useToast } from '@chakra-ui/react'

/**
 * A component that allows users to post comments on a project.
 *
 * @param {Object} project - The project object on which the comment is to be posted.
 * 
 * @returns {JSX.Element} The rendered PostCommentForm component.
 */
export default function PostCommentForm({ project, addComment }) {

    const dispatch = useDispatch();
    const toast = useToast();

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

        const sanitizedCommentBody = sanitizeCommentBody(commentBody);
        if (!validateCommentBody(sanitizedCommentBody, toast)) {
          return;
        }

        const newComment = {
            postedBy: currentUser.githubUsername,
            commenterProfileImage: currentUser.userImage,
            datePosted: new Date(),
            commentBody: sanitizedCommentBody
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
                <Image src={currentUser ? currentUser.userImage : ""} width={['20%', '10%']} pr='10px'/>
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
                ml='auto' 
                mt='5px' 
                onClick={handleSubmit}
                >Comment
            </Button>
        </Flex>
    )
}