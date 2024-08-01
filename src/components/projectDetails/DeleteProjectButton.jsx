import React, { useState, useRef } from 'react';
import { Button, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Tooltip } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProjectAsync } from '../../redux/projects/projectCardThunks';
import { fetchUserAsync } from '../../redux/user/userThunks';

/**
 * A button component that allows users to delete a project, with a confirmation dialog and error handling.
 *
 * @param {Object} project - The project object to be deleted.
 * 
 * @returns {JSX.Element} The rendered DeleteProjectButton component.
 */
const DeleteProjectButton = ({ project }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleDelete = async () => {
        try {
            await dispatch(deleteProjectAsync(project.projectID)).unwrap();
            const token = localStorage.getItem("token");
            if (token) {
              dispatch(fetchUserAsync(token));
            }
            toast({
                title: "Project deleted.",
                description: "The project has been successfully deleted.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate('/home');
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

    const handleDeleteClick = () => {
        if (currentUser.userID === project.projectOwner && project.subscribedUsers.length === 0) {
            setIsOpen(true);
        } else {
            toast({
                title: "Cannot delete project.",
                description: currentUser.userID !== project.projectOwner 
                    ? "Only the project owner can delete this project." 
                    : "The project cannot be deleted as there are subscribed users.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const canDelete = currentUser.userID === project.projectOwner && project.subscribedUsers.length === 0;

    return (
        currentUser.userID === project.projectOwner && (
            <>
                <Tooltip label="Cannot delete project while there are subscribed users" isDisabled={canDelete}>
                    <Button colorScheme="red" onClick={handleDeleteClick} isDisabled={!canDelete} opacity={canDelete ? 1 : 0.5}>
                        Delete Project
                    </Button>
                </Tooltip>

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
        )
    );
};

export default DeleteProjectButton;
