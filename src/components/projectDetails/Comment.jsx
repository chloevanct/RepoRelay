import BlankPP from "../../assets/blank-profile-picture.jpeg";
import { Flex, Image, Text } from "@chakra-ui/react"

export default function Comment({ comment }) {

    const commenterProfileImage = comment.commenterProfileImage ? comment.commenterProfileImage : BlankPP;
    console.log(comment);

    return (
        <Flex>
            <Flex width='100%'>
                <Image src={ commenterProfileImage } width='10%' pr='10px'/>
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