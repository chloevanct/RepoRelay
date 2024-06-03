import { Button, Heading, Checkbox, Stack, Box } from '@chakra-ui/react';
import ClearFiltersButton from './ClearFiltersButton';

export default function FilterForm() {
    return (
        <Box pl='5%' textAlign='left'>
            <Box pt='10px' pb='20px'>
                <ClearFiltersButton />
            </Box>

            <Heading size='md' pb='10px'>Difficulty</Heading>
            <Stack direction='column' pb='20px'>
                <Checkbox>Beginner</Checkbox>
                <Checkbox>Intermediate</Checkbox>
                <Checkbox>Advanced</Checkbox>
            </Stack>

            <Heading size='md' pb='10px'>Project Tags</Heading>
            <Stack direction='column' pb='20px'>
                <Checkbox>AI/ML</Checkbox>
                <Checkbox>Web Dev</Checkbox>
                <Checkbox>Automation</Checkbox>
            </Stack>

            <Heading size='md' pb='10px'>Tech Tags</Heading>
            <Stack direction='column' pb='20px'>
                <Checkbox>JavaScript</Checkbox>
                <Checkbox>Python</Checkbox>
                <Checkbox>React</Checkbox>
            </Stack>
        </Box>
    );
}
