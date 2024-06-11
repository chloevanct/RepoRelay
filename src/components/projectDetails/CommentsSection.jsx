import PostCommentsForm from './PostCommentForm'
import Comment from './Comment'
import { Flex, Heading, UnorderedList, ListItem } from '@chakra-ui/react';


const cardComments = [
    {
        title: 'Comment 1',
        postedBy: 'username123',
        postedDate: '2017-01-01',
        body: "This is the best project I've ever seen!"
    },
    {
        title: 'Comment 2',
        postedBy: 'username321',
        postedDate: '2016-12-31',
        body: "This is the worst project I've ever seen! Who taught you to code?"
    }
]

export default function CommentsSection({ card }) {
    return (
        <Flex direction='column'>
            <Heading align='left'>Comments:</Heading>
            <PostCommentsForm />
            <UnorderedList listStyleType='none' pt='10px'>
                {cardComments.map((comment, index) => (
                    <ListItem key={index} mb='20px' border='1px solid' p='5px'>
                        <Comment comment={comment} />
                    </ListItem>
                ))}
            </UnorderedList>
        </Flex>

    )
}