import React, { useState } from 'react';
import Tag from '../Tag';
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../../utils/tagColorMappings';
import { Flex, Heading, Button, HStack, Box, Wrap, WrapItem } from '@chakra-ui/react';
import { TagInput } from '../postProject/TagInput';
import { DifficultySelector } from '../postProject/DifficultySelector';
import { useDispatch, useSelector } from 'react-redux';
import { updatePartialProjectAsync } from '../../redux/projects/projectCardThunks';

export default function ProjectTags({ project }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const [isEditingDifficulty, setIsEditingDifficulty] = useState(false);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [isEditingTech, setIsEditingTech] = useState(false);

    const [newDifficultyTag, setNewDifficultyTag] = useState(project.difficultyTag);
    const [newProjectTags, setNewProjectTags] = useState(project.projectTags);
    const [newTechTags, setNewTechTags] = useState(project.techTags);

    const handleSaveDifficulty = () => {
        dispatch(updatePartialProjectAsync({ id: project.projectID, project: { difficultyTag: newDifficultyTag } }));
        setIsEditingDifficulty(false);
    };

    const handleSaveProject = () => {
        dispatch(updatePartialProjectAsync({ id: project.projectID, project: { projectTags: newProjectTags } }));
        setIsEditingProject(false);
    };

    const handleSaveTech = () => {
        dispatch(updatePartialProjectAsync({ id: project.projectID, project: { techTags: newTechTags } }));
        setIsEditingTech(false);
    };

    const handleCancelDifficulty = () => {
        setNewDifficultyTag(project.difficultyTag);
        setIsEditingDifficulty(false);
    };

    const handleCancelProject = () => {
        setNewProjectTags(project.projectTags);
        setIsEditingProject(false);
    };

    const handleCancelTech = () => {
        setNewTechTags(project.techTags);
        setIsEditingTech(false);
    };

    const isOwner = currentUser.userID === project.projectOwner;
    const isSubscribedUser = project.subscribedUsers.includes(currentUser.userID);
    const canEdit = isOwner || isSubscribedUser;

    return (
        <Flex direction='column' mb='10px'>
            <Flex align='center' justify='space-between' my='10px' direction={['column', 'column', 'row']} gap='5px'>
                <Box flex='1' textAlign='left' my='5px'>
                    <Heading size='md'>Difficulty: </Heading>
                </Box>
                <Box flex='2' textAlign={['center', 'center', 'left']} my='5px' px="10px">
                    {isEditingDifficulty ? (
                        <DifficultySelector
                            id='difficultyTag'
                            label='Difficulty Level'
                            value={newDifficultyTag}
                            onChange={(value) => setNewDifficultyTag(value)}
                            options={Object.keys(difficultyColorMapping)}
                        />
                    ) : (
                        <Tag tagName={project.difficultyTag} colorMapping={difficultyColorMapping} />
                    )}
                </Box>
                <Box flex='1' display='flex' flexDirection={['column', 'column', 'row']} gap='5px' textAlign='center' my='5px' width={['50%', '50%', 'auto']}>
                    {isEditingDifficulty ? (
                        <HStack width="100%">
                            <Button size='sm' p="10px" flex="1" onClick={handleSaveDifficulty}>Save</Button>
                            <Button size='sm' p="10px" flex="1" onClick={handleCancelDifficulty}>Cancel</Button>
                        </HStack>
                    ) : (
                        canEdit && <Button size='sm' p="10px" flex="1" onClick={() => setIsEditingDifficulty(true)}>Edit</Button>
                    )}
                </Box>
            </Flex>

            <Flex align='center' justify='space-between' my='10px' direction={['column', 'column', 'row']} gap='5px'>
                <Box flex='1' textAlign='left' my='5px'>
                    <Heading size='md'>Project Tags: </Heading>
                </Box>
                <Box flex='2' textAlign={['center', 'center', 'left']} my='5px' px="10px">
                    {isEditingProject ? (
                        <TagInput
                            id='projectTags'
                            label='Select project tags'
                            tags={newProjectTags}
                            tagMapping={projectColorMapping}
                            onAdd={(tag) => setNewProjectTags([...newProjectTags, tag])}
                            onRemove={(index) => setNewProjectTags(newProjectTags.filter((_, i) => i !== index))}
                            allowMultiple={true}
                        />
                    ) : (
                        <Wrap spacing={2} justify={['center', 'center', 'flex-start']}>
                            {project.projectTags.map((projectTag, index) => (
                                <WrapItem key={index}>
                                    <Tag tagName={projectTag} colorMapping={projectColorMapping} />
                                </WrapItem>
                            ))}
                        </Wrap>
                    )}
                </Box>
                <Box flex='1' display='flex' flexDirection={['column', 'column', 'row']} gap='5px' textAlign='center' my='5px' width={['50%', '50%', 'auto']}>
                    {isEditingProject ? (
                        <HStack width="100%">
                            <Button size='sm' p="10px" flex="1" onClick={handleSaveProject}>Save</Button>
                            <Button size='sm' p="10px" flex="1" onClick={handleCancelProject}>Cancel</Button>
                        </HStack>
                    ) : (
                        canEdit && <Button size='sm' p="10px" flex="1" onClick={() => setIsEditingProject(true)}>Edit</Button>
                    )}
                </Box>
            </Flex>

            <Flex align='center' justify='space-between' my='10px' direction={['column', 'column', 'row']} gap='5px'>
                <Box flex='1' textAlign='left' my='5px'>
                    <Heading size='md'>Technology: </Heading>
                </Box>
                <Box flex='2' textAlign={['center', 'center', 'left']} my='5px' px="10px">
                    {isEditingTech ? (
                        <TagInput
                            id='techTags'
                            label='Select tech tags'
                            tags={newTechTags}
                            tagMapping={technologyColorMapping}
                            onAdd={(tag) => setNewTechTags([...newTechTags, tag])}
                            onRemove={(index) => setNewTechTags(newTechTags.filter((_, i) => i !== index))}
                            allowMultiple={true}
                        />
                    ) : (
                        <Wrap spacing={2} justify={['center', 'center', 'flex-start']}>
                            {project.techTags.map((techTag, index) => (
                                <WrapItem key={index}>
                                    <Tag tagName={techTag} colorMapping={technologyColorMapping} />
                                </WrapItem>
                            ))}
                        </Wrap>
                    )}
                </Box>
                <Box flex='1' display='flex' flexDirection={['column', 'column', 'row']} gap='5px' textAlign='center' my='5px' width={['50%', '50%', 'auto']}>
                    {isEditingTech ? (
                        <HStack width="100%">
                            <Button size='sm' p="10px" flex="1" onClick={handleSaveTech}>Save</Button>
                            <Button size='sm' p="10px" flex="1" onClick={handleCancelTech}>Cancel</Button>
                        </HStack>
                    ) : (
                        canEdit && <Button size='sm' p="10px" flex="1" onClick={() => setIsEditingTech(true)}>Edit</Button>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
}
