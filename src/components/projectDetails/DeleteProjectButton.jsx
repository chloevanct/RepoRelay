import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { deleteProjectAsync } from '../../redux/projects/projectCardThunks';

const DeleteProjectButton = ({ projectID }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleDelete = async () => {
        try {
            await dispatch(deleteProjectAsync(projectID)).unwrap();
            toast({
                title: "Project deleted.",
                description: "The project has been successfully deleted.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate('/'); // Redirect to homepage
        } catch (error) {
            toast({
                title: "Error deleting project.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <Button colorScheme="red" onClick={handleDelete}>
            Delete Project
        </Button>
    );
};

export default DeleteProjectButton;
