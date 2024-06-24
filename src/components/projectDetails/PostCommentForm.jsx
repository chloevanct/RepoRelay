import { Heading, Text, FormControl, Input, Flex, Image, Button } from '@chakra-ui/react'


const user = {
    name: 'Kai',
    photo: 'https://www.shutterstock.com/shutterstock/photos/2273185135/display_1500/stock-photo-studio-headshot-portrait-of-domestic-cat-with-mouth-open-against-a-teal-background-2273185135.jpg'
}

export default function PostCommentForm() {
    return (
        <Flex direction='column' pt='10px' pl='20px'>
            <Flex>
                <Image src={user.photo} width='10%' pr='10px'/>
                <FormControl>
                    <Input height='100%' placeholder='Write a comment...' _placeholder={{ textAlign: 'start', lineHeight: '100%' }} justifyItems='start'/>
                </FormControl>
            </Flex>
            <Button colorScheme="teal" fontWeight='bold' width='10%' ml='auto' mt='5px'>Comment</Button>
        </Flex>


    )
}