import React, { useState } from 'react';
import { Flex, Heading, Text, Box, Button, Input, Textarea, Image, Link, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePartialProjectAsync } from '../../redux/projects/projectCardThunks';
import GitHubLogo from "../../assets/github-logo.png";
import DeleteProjectButton from './DeleteProjectButton';
import { sanitizeText, sanitizeTaskBody, validateName, validateDescription, validateImageUrl } from '../../utils/sanitization'; 


/**
 * A component that displays and allows editing of project information, including the project name, image URL, and description.
 *
 * @param {Object} project - The project object containing project details.
 * 
 * @returns {JSX.Element} The rendered EditableProjectInfo component.
 */
export default function EditableProjectInfo({ project }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const toast = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [newProjectName, setNewProjectName] = useState(project.projectName);
    const [newImageUrl, setNewImageUrl] = useState(project.projectImgURL);
    const [newDescription, setNewDescription] = useState(project.projectDescription);

    const handleSave = () => {
        const sanitizedProjectName = sanitizeText(newProjectName);
        const sanitizedImageUrl = sanitizeText(newImageUrl);
        const sanitizedDescription = sanitizeText(newDescription);

        if (
            !validateName(sanitizedProjectName, toast) ||
            !validateDescription(sanitizedDescription, toast) ||
            !validateImageUrl(sanitizedImageUrl, toast)
        ) {
            return;
        }

        dispatch(updatePartialProjectAsync({
            id: project.projectID,
            project: {
                projectName: sanitizedProjectName,
                projectImgURL: sanitizedImageUrl,
                projectDescription: sanitizedDescription,
            },
        }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewProjectName(project.projectName);
        setNewImageUrl(project.projectImgURL);
        setNewDescription(project.projectDescription);
        setIsEditing(false);
    };

    const isOwner = currentUser.userID === project.projectOwner;
    const isSubscribedUser = project.subscribedUsers.includes(currentUser.userID);
    const canEdit = isOwner || isSubscribedUser;

    return (
        <Flex direction="column" align="flex-start" bg="gray.50" shadow="md" borderWidth="1px" borderRadius="lg" p={4}>
            <Flex width="100%" mb={3} align="center" justify="space-between" direction={['column', 'column', 'row']}>
                <Box textAlign={['center', 'center', 'left']} mb={['10px', '10px', '0']}>
                    {isEditing ? (
                        <Input
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            placeholder="Project Name"
                            size="lg"
                        />
                    ) : (
                        <Heading size="lg">{project.projectName}</Heading>
                    )}
                </Box>
                {!isEditing && canEdit && (
                    <Flex gap="5px" justify={['center', 'center', 'flex-end']} width={['100%', '100%', 'auto']}>
                        <Button colorScheme="teal" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                        <DeleteProjectButton project={project} />
                    </Flex>
                )}
            </Flex>
            <Flex width="100%" direction={['column', 'column', 'row']} gap="20px" align={['center', 'center', 'center']}>
                <Box flex={['0', '0', '15%']} mb={3} width={['60%', '60%', '15%']}>
                    {isEditing ? (
                        <Input
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            placeholder="Image URL"
                        />
                    ) : (
                        <Image
                            width="100%"
                            height="auto"
                            objectFit="cover"
                            src={project.projectImgURL}
                            alt={project.projectName}
                            fallbackSrc={GitHubLogo}
                        />
                    )}
                </Box>
                <Box flex={['0', '0', '75%']} mb={3} display="flex" flexDirection="column" justifyContent="center">
                    <Flex direction="column" gap="10px" textAlign={['center', 'center', 'left']}>
                        <Text fontSize={['1rem', '1rem', '1.25rem']}>Posted: {new Date(project.postedDate).toLocaleDateString()}</Text>
                        <Text fontSize={['1rem', '1rem', '1.25rem']}>Last activity: {new Date(project.lastActivityDate).toLocaleDateString()}</Text>
                        {isEditing ? (
                            <Textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Project Description"
                            />
                        ) : (
                            <Text maxWidth="100%" fontSize={['1rem', '1rem', '1.25rem']} noOfLines='3'>
                                {project.projectDescription}
                            </Text>
                        )}
                        <Link 
                            fontSize={['1rem', '1rem', '1.25rem']}
                            href={project.githubURL}
                            isExternal
                        >
                            {project.githubURL}
                        </Link>
                    </Flex>
                </Box>
            </Flex>
            {isEditing && (
                <Flex gap="5px" mt={3}>
                    <Button size="sm" colorScheme="teal" onClick={handleSave}>
                        Save
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Flex>
            )}
        </Flex>
    );
}
