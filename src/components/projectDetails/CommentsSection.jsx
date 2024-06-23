import PostCommentsForm from './PostCommentForm'
import Comment from './Comment'
import { Flex, Heading, UnorderedList, ListItem } from '@chakra-ui/react';

export default function CommentsSection({ project }) {
    return (
        <Flex direction='column'>
            <Heading align='left'>Comments:</Heading>
            <PostCommentsForm />
            <UnorderedList listStyleType='none' pt='10px'>
                {project.comments.map((comment, index) => (
                    <ListItem key={index} mb='20px' border='1px solid' p='5px'>
                        <Comment comment={comment} />
                    </ListItem>
                ))}
            </UnorderedList>
        </Flex>

    )
}