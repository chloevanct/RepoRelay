import { Flex, Heading, Button, UnorderedList, ListItem, Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePartialProjectAsync } from '../../redux/projects/projectCardThunks';

export default function ProjectUsers({ project }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleAddPastContributor = () => {
        console.log('Dispatching updatePartialProjectAsync:', { projectID: project.projectID, userID: currentUser.userID });
        dispatch(updatePartialProjectAsync({ id: project.projectID, project: { pastContributors: [...project.pastContributors, currentUser.userID] } }));
    };

    const handleRemovePastContributor = () => {
        console.log('Removing past contributor:', { projectID: project.projectID, userID: currentUser.userID });
        dispatch(updatePartialProjectAsync({ id: project.projectID, project: { pastContributors: project.pastContributors.filter(contributor => contributor !== currentUser.userID) } }));
    };

    const handleAddSubscribedUser = () => {
        console.log('Adding subscribed user:', { projectID: project.projectID, userID: currentUser.userID });
        dispatch(updatePartialProjectAsync({ id: project.projectID, project: { subscribedUsers: [...project.subscribedUsers, currentUser.userID] } }));
    };

    const handleRemoveSubscribedUser = () => {
        console.log('Removing subscribed user:', { projectID: project.projectID, userID: currentUser.userID });
        dispatch(updatePartialProjectAsync({ id: project.projectID, project: { subscribedUsers: project.subscribedUsers.filter(subscriber => subscriber !== currentUser.userID) } }));
    };

    return (
        <Flex direction="column" mb="10px">
            <Flex justify="space-between" mb="10px">
                <Button size="sm" onClick={handleAddPastContributor}>Add Self as Contributor</Button>
                <Button size="sm" onClick={handleRemovePastContributor}>Remove Self as Contributor</Button>
                <Button size="sm" onClick={handleAddSubscribedUser}>Add Self as Subscriber</Button>
                <Button size="sm" onClick={handleRemoveSubscribedUser}>Remove Self as Subscriber</Button>
            </Flex>
            <Flex align="center" justify="flex-start" mb="10px">
                <Heading size="md" width="20%">Project Owner:</Heading>
                <Box width="80%">
                    <p>{project.projectOwner}</p>
                </Box>
            </Flex>
            <Flex align="center" justify="flex-start" mb="10px">
                <Flex direction="column" width="20%">
                    <Heading size="md">Past Contributors:</Heading>
                </Flex>
                <Flex direction="column" width="80%">
                    <UnorderedList listStyleType="none" display="flex" flexWrap="wrap" gap="10px" mb="10px">
                        {project.pastContributors.map((pastContributor, index) => (
                            <ListItem key={index}>
                                <p>{pastContributor}</p>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Flex>
            </Flex>
            <Flex align="center" justify="flex-start" mb="10px">
                <Flex direction="column" width="20%">
                    <Heading size="md">Subscribed Users:</Heading>
                </Flex>
                <Flex direction="column" width="80%">
                    <UnorderedList listStyleType="none" display="flex" flexWrap="wrap" gap="10px" mb="10px">
                        {project.subscribedUsers.map((subscribedUser, index) => (
                            <ListItem key={index}>
                                <p>{subscribedUser}</p>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Flex>
            </Flex>
        </Flex>
    );
}
