import SortByMenu from './SortByMenu'
import { Flex, Box, Text } from '@chakra-ui/react'

export default function ProjectListHeader() {
    return (
        <Flex id="project-list-header" direction="column" justify="flex-start" align="flex-start"p="4" width="100%">
            <Box>
                <Text fontSize="3xl">All Projects</Text>
            </Box>
            <Flex id="showing-x-projects-sort-by" justify="space-between" align="center" width="100%">
                <Text fontSize="md" color="#5B5B5B" mr={2}>Showing 27 available projects</Text>
                <SortByMenu />
            </Flex>
        </Flex>
    )
}