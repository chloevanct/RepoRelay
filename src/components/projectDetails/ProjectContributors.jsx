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

    const isContributor = project.pastContributors.includes(currentUser.userID);
    const isSubscriber = project.subscribedUsers.includes(currentUser.userID);

    return (
        <Flex direction="column" mb="10px">
            <Flex align="center" justify="space-between" my="10px" direction={['column', 'column', 'row']} gap="5px">
                <Box flex="1" textAlign="left" my="5px">
                    <Heading size="md">Project Owner:</Heading>
                </Box>
                <Box flex="2" textAlign={['center', 'center', 'left']} my="5px" px="10px">
                    <p>{project.projectOwner}</p>
                </Box>
                <Box flex="1"></Box> {/* Placeholder for alignment */}
            </Flex>

            <Flex align="center" justify="space-between" my="10px" direction={['column', 'column', 'row']} gap="5px">
                <Box flex="1" textAlign="left" my="5px">
                    <Heading size="md">Past Contributors:</Heading>
                </Box>
                <Box flex="2" textAlign={['center', 'center', 'left']} my="5px" px="10px">
                    <UnorderedList listStyleType="none" m={0} p={0} display="flex" flexWrap="wrap" justifyContent={['center', 'center', 'flex-start']} alignItems="center" gap="10px">
                        {project.pastContributors.map((pastContributor, index) => (
                            <ListItem key={index}>
                                <p>{pastContributor}</p>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
                <Box flex="1" display="flex" flexDirection={['column', 'column', 'row']} gap="5px" textAlign="left" my="5px" width={['50%', '50%', 'auto']} px={['10px', '10px', '0px']}>
                    {!isContributor ? (
                        <Button size="sm" colorScheme="teal" onClick={handleAddPastContributor} flex="1" p="10px">Start Contributing</Button>
                    ) : (
                        <Button size="sm" colorScheme="red" onClick={handleRemovePastContributor} flex="1" p="10px">Stop Contributing</Button>
                    )}
                </Box>
            </Flex>

            <Flex align="center" justify="space-between" my="10px" direction={['column', 'column', 'row']} gap="5px">
                <Box flex="1" textAlign="left" my="5px">
                    <Heading size="md">Subscribed Users:</Heading>
                </Box>
                <Box flex="2" textAlign={['center', 'center', 'left']} my="5px" px="10px">
                    <UnorderedList listStyleType="none" m={0} p={0} display="flex" flexWrap="wrap" justifyContent={['center', 'center', 'flex-start']} alignItems="center" gap="10px">
                        {project.subscribedUsers.map((subscribedUser, index) => (
                            <ListItem key={index}>
                                <p>{subscribedUser}</p>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
                <Box flex="1" display="flex" flexDirection={['column', 'column', 'row']} gap="5px" textAlign="left" my="5px" width={['50%', '50%', 'auto']} px={['10px', '10px', '0px']}>
                    {!isSubscriber ? (
                        <Button size="sm" colorScheme="teal" onClick={handleAddSubscribedUser} flex="1" p="10px">Subscribe</Button>
                    ) : (
                        <Button size="sm" colorScheme="red" onClick={handleRemoveSubscribedUser} flex="1" p="10px">Unsubscribe</Button>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
}
