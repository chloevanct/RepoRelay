import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Heading, VStack, HStack, Avatar, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { TagInput } from '../components/postProject/TagInput';
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../utils/tagColorMappings';
import { updateUser } from '../redux/user/userSlice';

export default function ProfileCreationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);

    const [userID, setUserID] = useState("");
    const [githubUsername, setGithubUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userImage, setUserImage] = useState("");
    const [difficultyTags, setDifficultyTags] = useState([]);
    const [projectTags, setProjectTags] = useState([]);
    const [techTags, setTechTags] = useState([]);

    const handleSave = () => {
        const updatedUser = {
            userID,
            githubUsername,
            password,
            ownedProjects: [],
            subscribedProjects: [],
            firstName,
            lastName,
            userImage,
            emailAddress: email,
            preferences: {
                difficultyTags,
                projectTags,
                techTags
            }
        };
        dispatch(updateUser(updatedUser));
        console.log("Updated user", updatedUser);
    };

    useEffect(() => {
        if (user.firstName && user.lastName && user.emailAddress) {
            console.log("Navigating to home");
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <Container maxW="container.lg" width="100%" mt={5}>
            <Header />
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50" width="100%" mt={5}>
                <Heading as="h3" size="lg" mb={5}>
                    Profile Creation
                </Heading>
                <VStack spacing={4} align="stretch">
                    <Input
                        placeholder="User ID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                    />
                    <Input
                        placeholder="GitHub Username"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <HStack spacing={4} align="center">
                        <Avatar size="xl" src={userImage} />
                        <Box>
                            <Input
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Input
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                mt={2}
                            />
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                mt={2}
                            />
                            <Input
                                placeholder="Profile Image URL"
                                value={userImage}
                                onChange={(e) => setUserImage(e.target.value)}
                                mt={2}
                            />
                        </Box>
                    </HStack>

                    <Box>
                        <Heading as="h4" size="md" mb={2}>Difficulty Preferences</Heading>
                        <TagInput
                            id="difficultyTags"
                            label="Difficulty Tags"
                            tags={difficultyTags}
                            tagMapping={difficultyColorMapping}
                            onAdd={(tag) => setDifficultyTags([tag])}
                            onRemove={() => setDifficultyTags([])}
                            allowMultiple={false}
                        />
                    </Box>

                    <Box>
                        <Heading as="h4" size="md" mb={2}>Project Type Preferences</Heading>
                        <TagInput
                            id="projectTags"
                            label="Project Type Tags"
                            tags={projectTags}
                            tagMapping={projectColorMapping}
                            onAdd={(tag) => setProjectTags([...projectTags, tag])}
                            onRemove={(index) => setProjectTags(projectTags.filter((_, i) => i !== index))}
                            allowMultiple={true}
                        />
                    </Box>

                    <Box>
                        <Heading as="h4" size="md" mb={2}>Technology Preferences</Heading>
                        <TagInput
                            id="techTags"
                            label="Technology Tags"
                            tags={techTags}
                            tagMapping={technologyColorMapping}
                            onAdd={(tag) => setTechTags([...techTags, tag])}
                            onRemove={(index) => setTechTags(techTags.filter((_, i) => i !== index))}
                            allowMultiple={true}
                        />
                    </Box>

                    <Button colorScheme="teal" onClick={handleSave}>
                        Save Profile
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
}
