import SortByMenu from './SortByMenu'
import { Flex, Box, Text } from '@chakra-ui/react'

export default function ProjectListHeader() {
    return (
        <Flex justify="space-between" align="center" p={4} width="100%">
            <Box>
                <Box> {/* to look better on mobile devices */}
                    <Flex>
                    <Text fontSize="3xl">All Projects</Text>
                    </Flex>
                </Box>
                <Flex alignItems="center" justify="space-between">
                    <Text fontSize="md" color="#5B5B5B" mr={2}>Showing 27 available projects</Text>
                    <SortByMenu />
                </Flex>
            </Box>
        </Flex>
    )
}