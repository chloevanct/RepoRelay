import React, { useState, useRef } from 'react';
import { Button, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProjectAsync } from '../../redux/projects/projectCardThunks';

const DeleteProjectButton = ({ projectID }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

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
        <>
            <Button colorScheme="red" onClick={() => setIsOpen(true)}>
                Delete Project
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirm Deletion
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this project? This action cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteProjectButton;
