import React from 'react';
import { useSelector } from 'react-redux';
import SortByMenu from './SortByMenu';
import { Flex, Box, Text } from '@chakra-ui/react';
import { selectFilteredProjectCount } from '../../../utils/selectors';

/**
 * Component to display the header of the project list, including the number of available projects
 * and a sort menu for sorting options.
 * 
 * @returns {JSX.Element} The rendered project list header component.
 */
export default function ProjectListHeader({ chosenOption, setChosenOption }) {

    const filteredProjectCount = useSelector(selectFilteredProjectCount);

    return (
        <Flex id="project-list-header" direction="column" justify="flex-start" align="flex-start" px="4" width="100%">
            <Box>
                <Text fontSize={['1rem', '1.5rem', '2rem', '2.5rem', '3rem']}>All Projects</Text>
            </Box>
            <Flex justify="space-between" align="center" width="100%">
                <Text color="#5B5B5B" mr={2} fontSize={['0.6rem', '0.6rem', '1.2rem']}>Showing {filteredProjectCount} available projects</Text>
                <SortByMenu chosenOption={chosenOption} setChosenOption={setChosenOption} />
            </Flex>
        </Flex>
    );
}
