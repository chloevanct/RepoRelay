import { Button } from '@chakra-ui/react';

export default function ClearFiltersButton({ onClick }) {
    return (
        <Button onClick={onClick} colorScheme="teal" fontWeight='bold'>
            Clear All Filters
        </Button>
    );
}
