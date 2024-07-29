import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Stack, Heading, Checkbox, RadioGroup, Radio, Menu, MenuButton, MenuList, MenuItem, Button, Input } from '@chakra-ui/react';
import { toggleTagFilter, clearFilters } from '../../redux/projects/projectSlice.js';
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../../utils/tagColorMappings';
import ClearFiltersButton from './ClearFiltersButton';


/**
 * A form component for filtering projects based on difficulty, project tags, and technology tags.
 * It includes options to select or deselect tags and clear all filters at once. The component uses Redux for state management.
 * 
 * @returns {JSX.Element} The rendered FilterForm component.
 */
export default function FilterForm() {
    const dispatch = useDispatch();

    const tagCategories = {
        project: Object.keys(projectColorMapping),
        tech: Object.keys(technologyColorMapping)
    };

    const difficultyOptions = ['Any', ...Object.keys(difficultyColorMapping)];

    const initialCheckedState = Object.keys(tagCategories).reduce((acc, category) => {
        acc[category] = Array(tagCategories[category].length).fill(false);
        return acc;
    }, {});

    const [checkedTags, setCheckedTags] = useState(initialCheckedState);
    const [selectedDifficulty, setSelectedDifficulty] = useState('Any');
    const [searchText, setSearchText] = useState({ project: '', tech: '' });

    const clearAllTags = () => {
        setCheckedTags(initialCheckedState);
        setSelectedDifficulty('Any');
        dispatch(clearFilters());
    };

    const handleTagChange = (category, index, tag) => {
        setCheckedTags((prevCheckedTags) => ({
            ...prevCheckedTags,
            [category]: [
                ...prevCheckedTags[category].slice(0, index),
                !prevCheckedTags[category][index],
                ...prevCheckedTags[category].slice(index + 1),
            ]
        }));
        const type = `${category}Tags`;
        dispatch(toggleTagFilter({ tag, type }));
    };

    const handleDropdownChange = (category, tag) => {
        const index = tagCategories[category].indexOf(tag);
        if (index !== -1) {
            handleTagChange(category, index, tag);
        }
    };

    const handleDifficultyChange = (value) => {
        setSelectedDifficulty(value);
        const tag = value === 'Any' ? null : value;
        dispatch(toggleTagFilter({ tag, type: 'difficultyTag' }));
    };

    const handleSearchChange = (category, e) => {
        setSearchText({ ...searchText, [category]: e.target.value });
    };

    return (
        <Box textAlign='left'>
            <Box pt='10px' pb='20px'>
                <ClearFiltersButton onClick={clearAllTags} />
            </Box>

            <Box pb='20px'>
                <Heading size={['xs', 'sm', 'md', 'lg']} pb='10px'>
                    Difficulty
                </Heading>
                <RadioGroup onChange={handleDifficultyChange} value={selectedDifficulty}>
                    <Stack direction='column' >
                        {difficultyOptions.map((option) => (
                            <Radio key={option} value={option} size={['sm', 'md', 'lg']}>
                                {option}
                            </Radio>
                        ))}
                    </Stack>
                </RadioGroup>
            </Box>

            {Object.keys(tagCategories).map((category) => (
                <Box key={category} pb='20px'>
                    <Heading size={['xs', 'sm', 'md', 'lg']} pb='10px'>
                        {category.charAt(0).toUpperCase() + category.slice(1)} Tags
                    </Heading>
                    <Stack direction='column'>
                        <Menu>
                            <MenuButton as={Button} px='1' fontSize={['0.6rem', '0.6rem', '1.2rem']}>
                                Select {category} tags
                            </MenuButton>
                            <MenuList maxHeight="200px" overflowY="auto" minW='0'>
                                <Box p={2}>
                                    <Input
                                        placeholder="Search"
                                        value={searchText[category]}
                                        onChange={(e) => handleSearchChange(category, e)}
                                        fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                                    />
                                </Box>
                                {tagCategories[category]
                                    .filter((tag) => tag.toLowerCase().includes(searchText[category].toLowerCase()))
                                    .map((tag, index) => (
                                        !checkedTags[category][index] && (
                                            <MenuItem 
                                                key={tag} 
                                                onClick={() => handleDropdownChange(category, tag)}
                                                fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                                            >
                                                {tag}
                                            </MenuItem>
                                        )
                                    ))}
                            </MenuList>
                        </Menu>
                        {tagCategories[category].map((tag, index) => (
                            checkedTags[category][index] && (
                                <Checkbox
                                    key={tag}
                                    isChecked={checkedTags[category][index]}
                                    onChange={() => handleTagChange(category, index, tag)}
                                    size={['sm', 'md', 'lg']}
                                >
                                    {tag}
                                </Checkbox>
                            )
                        ))}
                    </Stack>
                </Box>
            ))}
        </Box>
    );
}
