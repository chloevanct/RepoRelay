import React, { useState, useEffect } from "react";
import { Box, Container, Heading, VStack, HStack, Avatar, Input, Button, useToast, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { TagInput } from '../components/postProject/TagInput';
import { DifficultySelector } from '../components/postProject/DifficultySelector';
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../utils/tagColorMappings';
import { useUser } from '../hooks/useUser';

export default function ProfileCreationPage() {
    const { currentUser, handleUpdateUser } = useUser();
    const navigate = useNavigate();
    const toast = useToast();

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

    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const allFieldsFilled = userID && githubUsername && password && firstName && lastName && email && userImage && difficultyTags.length > 0;
        setIsSaveEnabled(allFieldsFilled);
    }, [userID, githubUsername, password, firstName, lastName, email, userImage, difficultyTags]);

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
        handleUpdateUser(updatedUser);
        toast({
            title: "Profile created.",
            description: "Your profile has been successfully created.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
        navigate("/home");
    };

    return (
        <>
        <Header />
        <Container maxW="container.lg" width="100%" mt={5}>
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
                    <InputGroup>
                        <Input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
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
                        <DifficultySelector
                            id="difficultyTags"
                            label="Difficulty Level"
                            value={difficultyTags[0]}
                            onChange={(value) => setDifficultyTags([value])}
                            options={Object.keys(difficultyColorMapping)}
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

                    <Button colorScheme="teal" onClick={handleSave} isDisabled={!isSaveEnabled}>
                        Save Profile
                    </Button>
                </VStack>
            </Box>
        </Container>
        </>
    );
}
