import Headshot from "../../assets/headshot.jpg";
import { Flex, Image, Text } from "@chakra-ui/react"

export default function Comment({ comment }) {
    return (
        <Flex>
            <Flex width='100%'>
                <Image src={Headshot} width='10%' pr='10px'/>
                <Flex direction='column' width='100%' pr='10px'>
                    <Flex width='100%'>
                        <Text>{comment.postedBy}</Text>
                        <Text ml='auto'>{comment.datePosted}</Text>
                    </Flex>
                    <Text align='left' borderTop='1px solid' height='100%'>{comment.commentBody}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}