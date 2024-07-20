import { Button } from '@chakra-ui/react';

export default function ClearFiltersButton({ onClick }) {
    return (
        <Button onClick={onClick} colorScheme="teal" fontWeight='bold' fontSize={['0.6rem', '0.6rem', '1.2rem']} px={[1, 1, 5]}>
            Clear All Filters
        </Button>
    );
}
