import { Button } from '@chakra-ui/react';

export default function ClearFiltersButton({ onClick }) {
    return (
        <Button onClick={onClick} colorScheme="teal">
            Clear All Filters
        </Button>
    );
}
