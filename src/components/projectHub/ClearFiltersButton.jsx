import { Button } from '@chakra-ui/react';
import clearAllTags from './FilterForm'

// TODO: Add functionality
export default function ClearFiltersButton({ onClick }) {
    return(
        <Button
            variant='link'
            size='sm'
            _hover={{ textDecoration: 'none' }}
            color='blue'
            pt='5px'
            pb='5px'
            onClick={onClick()}
        >
            CLEAR FILTERS
        </Button>
    )
}
