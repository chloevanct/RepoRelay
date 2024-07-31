import { Button } from '@chakra-ui/react';

/**
 * A button component used to clear all applied filters.
 * 
 * @returns {JSX.Element} The rendered ClearFiltersButton component.
 */
export default function ClearFiltersButton({ onClick }) {
    return (
        <Button onClick={onClick} colorScheme="teal" fontWeight='bold' fontSize={['0.6rem', '0.6rem', '1.2rem']} px={[1, 1, 5]}>
            Clear All Filters
        </Button>
    );
}
