import SearchBar from './SearchBar'
import { Box, Flex, Text } from '@chakra-ui/react'

/**
 * A component that renders a header section for the search bar.
 * 
 * This component displays a text message and the SearchBar component.
 * The text message is hidden on small screens and shown on medium and larger screens.
 * The layout adjusts to center the content on small screens and space it out on larger screens.
 * 
 * @returns {JSX.Element} The rendered SearchBarHeader component.
 */
export default function SearchBarHeader() {
    return (
        <>
        <Box p={[4, 8]}>
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