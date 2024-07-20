import BlankPP from "../../assets/blank-profile-picture.jpeg";
import { Flex, Image, Text, Box } from "@chakra-ui/react"

export default function Comment({ comment }) {

    const commenterProfileImage = comment.commenterProfileImage ? comment.commenterProfileImage : BlankPP;

    return (
        <Flex>
            <Flex width='100%'>
                <Box w={['20%', '10%']} alignContent="center">
                    <Image src={ commenterProfileImage } pr='10px' />
                </Box>
                <Flex direction='column' width='100%' pr='10px'>
                    <Flex width='100%'>
                        <Text>{comment.postedBy}</Text>
                        <Text ml='auto'>{new Date(comment.datePosted).toLocaleDateString()}</Text>
                    </Flex>
                    <Text align='left' borderTop='1px solid' height='100%'>{comment.commentBody}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}