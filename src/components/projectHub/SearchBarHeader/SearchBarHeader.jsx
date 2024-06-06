import SearchBar from './SearchBar'
import { Box, Flex, Text } from '@chakra-ui/react'

export default function SearchBarHeader() {
    return (
        <>
        <Box p={8}>
            <Flex alignItems="center"
                  justifyContent={{base:"center", md:"space-between"}}
                  gap={{base: 4, md: 0}}
            >
                <Text fontSize={{base: "sm", md: "lg"}}
                      color="545454"
                      display={{ base: "none", md: "block" }} // hide text on small screens
                      >
                        Explore projects and learn coding together!
                </Text>
                <SearchBar />
            </Flex>
        </Box>
    </>
    )
}