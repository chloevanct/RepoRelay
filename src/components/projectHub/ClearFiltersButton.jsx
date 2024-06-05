import { Button } from '@chakra-ui/react';

export default function ClearFiltersButton() {
    return(
        <Button
            variant='link'
            size='sm'
            _hover={{ textDecoration: 'none' }}
            color='blue'
            pt='5px'
            pb='5px'
        >
            CLEAR FILTERS
        </Button>
    )
}
