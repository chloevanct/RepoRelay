import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Heading, VStack, HStack, Avatar, Text, Wrap, WrapItem, Button } from "@chakra-ui/react";
import Header from '../components/Header';
import Tag from '../components/Tag';
import { TagInput } from '../components/postProject/TagInput';
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../utils/tagColorMappings';
import { updateDifficultyTags, updateProjectTags, updateTechTags } from '../redux/user/userSlice';

export default function UserProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    const [isEditingDifficulty, setIsEditingDifficulty] = useState(false);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [isEditingTech, setIsEditingTech] = useState(false);

    const [newDifficultyTags, setNewDifficultyTags] = useState(user.preferences.difficultyTags);
    const [newProjectTags, setNewProjectTags] = useState(user.preferences.projectTags);
    const [newTechTags, setNewTechTags] = useState(user.preferences.techTags);

    const handleSaveDifficulty = () => {
        dispatch(updateDifficultyTags(newDifficultyTags));
        setIsEditingDifficulty(false);
    };

    const handleSaveProject = () => {
        dispatch(updateProjectTags(newProjectTags));
        setIsEditingProject(false);
    };

    const handleSaveTech = () => {
        dispatch(updateTechTags(newTechTags));
        setIsEditingTech(false);
    };

    const handleCancelDifficulty = () => {
        setNewDifficultyTags(user.preferences.difficultyTags);
        setIsEditingDifficulty(false);
    };

    const handleCancelProject = () => {
        setNewProjectTags(user.preferences.projectTags);
        setIsEditingProject(false);
    };

    const handleCancelTech = () => {
        setNewTechTags(user.preferences.techTags);
        setIsEditingTech(false);
    };

    return (
        <>
            <Header />
            <Container maxW="container.lg" width="100%" mt={5}>
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50" width="100%" mt={5}>
                    <Heading as="h3" size="lg" mb={5}>
                        User Profile
                    </Heading>
                    <VStack spacing={4} align="stretch">
                        <HStack spacing={4} align="center">
                            <Avatar size="xl" name={`${user.firstName} ${user.lastName}`} src={user.userImage} />
                            <Box>
                                <Heading as="h4" size="md">{`${user.firstName} ${user.lastName}`}</Heading>
                                <Text>{user.emailAddress}</Text>
                                <Text>{`GitHub: ${user.githubUsername}`}</Text>
                            </Box>
                        </HStack>

                        <Box>
                            <HStack justifyContent="space-between">
                                <Heading as="h4" size="md" mb={2}>Difficulty Preference</Heading>
                                {isEditingDifficulty ? (
                                    <HStack>
                                        <Button size="sm" onClick={handleSaveDifficulty}>
                                            Save
                                        </Button>
                                        <Button size="sm" onClick={handleCancelDifficulty}>
                                            Cancel
                                        </Button>
                                    </HStack>
                                ) : (
                                    <Button size="sm" onClick={() => setIsEditingDifficulty(true)}>
                                        Edit
                                    </Button>
                                )}
                            </HStack>
                            {isEditingDifficulty ? (
                                <TagInput
                                    id="difficultyTags"
                                    label="Difficulty Tags"
                                    tags={newDifficultyTags}
                                    tagMapping={difficultyColorMapping}
                                    onAdd={(tag) => setNewDifficultyTags([tag])}
                                    onRemove={() => setNewDifficultyTags([])}
                                    allowMultiple={false}
                                />
                            ) : (
                                <Wrap spacing={2}>
                                    {newDifficultyTags.map((tag, index) => (
                                        <WrapItem key={index}>
                                            <Tag tagName={tag} colorMapping={difficultyColorMapping} />
                                        </WrapItem>
                                    ))}
                                </Wrap>
                            )}
                        </Box>

                        <Box>
                            <HStack justifyContent="space-between">
                                <Heading as="h4" size="md" mb={2}>Project Type Preferences</Heading>
                                {isEditingProject ? (
                                    <HStack>
                                        <Button size="sm" onClick={handleSaveProject}>
                                            Save
                                        </Button>
                                        <Button size="sm" onClick={handleCancelProject}>
                                            Cancel
                                        </Button>
                                    </HStack>
                                ) : (
                                    <Button size="sm" onClick={() => setIsEditingProject(true)}>
                                        Edit
                                    </Button>
                                )}
                            </HStack>
                            {isEditingProject ? (
                                <TagInput
                                    id="projectTags"
                                    label="Project Type Tags"
                                    tags={newProjectTags}
                                    tagMapping={projectColorMapping}
                                    onAdd={(tag) => setNewProjectTags([...newProjectTags, tag])}
                                    onRemove={(index) => setNewProjectTags(newProjectTags.filter((_, i) => i !== index))}
                                    allowMultiple={true}
                                />
                            ) : (
                                <Wrap spacing={2}>
                                    {newProjectTags.map((tag, index) => (
                                        <WrapItem key={index}>
                                            <Tag tagName={tag} colorMapping={projectColorMapping} />
                                        </WrapItem>
                                    ))}
                                </Wrap>
                            )}
                        </Box>

                        <Box>
                            <HStack justifyContent="space-between">
                                <Heading as="h4" size="md" mb={2}>Technology Preferences</Heading>
                                {isEditingTech ? (
                                    <HStack>
                                        <Button size="sm" onClick={handleSaveTech}>
                                            Save
                                        </Button>
                                        <Button size="sm" onClick={handleCancelTech}>
                                            Cancel
                                        </Button>
                                    </HStack>
                                ) : (
                                    <Button size="sm" onClick={() => setIsEditingTech(true)}>
                                        Edit
                                    </Button>
                                )}
                            </HStack>
                            {isEditingTech ? (
                                <TagInput
                                    id="techTags"
                                    label="Technology Tags"
                                    tags={newTechTags}
                                    tagMapping={technologyColorMapping}
                                    onAdd={(tag) => setNewTechTags([...newTechTags, tag])}
                                    onRemove={(index) => setNewTechTags(newTechTags.filter((_, i) => i !== index))}
                                    allowMultiple={true}
                                />
                            ) : (
                                <Wrap spacing={2}>
                                    {newTechTags.map((tag, index) => (
                                        <WrapItem key={index}>
                                            <Tag tagName={tag} colorMapping={technologyColorMapping} />
                                        </WrapItem>
                                    ))}
                                </Wrap>
                            )}
                        </Box>

                        <Box>
                            <Heading as="h4" size="md" mb={2}>Owned Projects</Heading>
                            <VStack align="start">
                                {user.ownedProjects.map((projectId, index) => (
                                    <Text key={index}>Project ID: {projectId}</Text>
                                ))}
                            </VStack>
                        </Box>

                        <Box>
                            <Heading as="h4" size="md" mb={2}>Subscribed Projects</Heading>
                            <VStack align="start">
                                {user.subscribedProjects.map((projectId, index) => (
                                    <Text key={index}>Project ID: {projectId}</Text>
                                ))}
                            </VStack>
                        </Box>
                    </VStack>
                </Box>
            </Container>
        </>
    );
}