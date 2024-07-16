import { useState, useEffect } from 'react';
import PostCommentsForm from './PostCommentForm'
import Comment from './Comment'
import { Flex, Heading, UnorderedList, ListItem, Button } from '@chakra-ui/react';

const COMMENTS_PER_PAGE = 10;

export default function CommentsSection({ project }) {

    const [displayedComments, setDisplayedComments] = useState([...project.comments].reverse().slice(0, COMMENTS_PER_PAGE));
    const [currentPage, setCurrentPage] = useState(1);

    const addComment = (newComment) => {
        setDisplayedComments((prevComments) => [newComment, ...prevComments]);
    };

    const loadMoreComments = () => {
        const nextPage = currentPage + 1;
        const newComments = [...project.comments].reverse().slice(0, nextPage * COMMENTS_PER_PAGE);
        setDisplayedComments(newComments);
        setCurrentPage(nextPage);
    };

    const hasMoreComments = currentPage * COMMENTS_PER_PAGE < project.comments.length;

    return (
        <Flex direction='column'>
            <Heading align='left'>Comments:</Heading>
            <PostCommentsForm project={project} addComment={addComment}/>
            <UnorderedList listStyleType='none' pt='10px'>
                {displayedComments.map((comment, index) => (
                    <ListItem key={index} mb='20px' border='1px solid' p='5px'>
                        <Comment comment={comment} />
                    </ListItem>
                ))}
            </UnorderedList>
            {hasMoreComments && (
                <Button onClick={loadMoreComments} mt='10px' alignSelf='center'>
                    Load More
                </Button>
            )}
        </Flex>
    )
}