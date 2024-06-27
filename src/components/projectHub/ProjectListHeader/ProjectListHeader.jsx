import React from 'react';
import { useSelector } from 'react-redux';
import SortByMenu from './SortByMenu';
import { Flex, Box, Text } from '@chakra-ui/react';
import { selectFilteredProjectCount } from '../../../utils/selectors';

// Component to display the header of the project list, including the number of available projects and a sort menu
export default function ProjectListHeader() {

    // Get the count of filtered projects from the Redux store
    const filteredProjectCount = useSelector(selectFilteredProjectCount);

    return (
        <Flex id="project-list-header" direction="column" justify="flex-start" align="flex-start" pl="4" pr="4" width="100%">
            <Box>
                <Text fontSize="3xl">All Projects</Text>
            </Box>
            <Flex id="showing-x-projects-sort-by" justify="space-between" align="center" width="100%">
                <Text fontSize="md" color="#5B5B5B" mr={2}>Showing {filteredProjectCount} available projects</Text>
                <SortByMenu />
            </Flex>
        </Flex>
    );
}
