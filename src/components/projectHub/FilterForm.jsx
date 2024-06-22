import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Stack, Heading, Checkbox, RadioGroup, Radio, Menu, MenuButton, MenuList, MenuItem, Button, Input } from '@chakra-ui/react';
import { toggleTagFilter, clearFilters } from '../../redux/projects/projectSlice.js';
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../../utils/tagColorMappings';
import ClearFiltersButton from './ClearFiltersButton';

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
                <Heading size='md' pb='10px'>
                    Difficulty
                </Heading>
                <RadioGroup onChange={handleDifficultyChange} value={selectedDifficulty}>
                    <Stack direction='column'>
                        {difficultyOptions.map((option) => (
                            <Radio key={option} value={option}>
                                {option}
                            </Radio>
                        ))}
                    </Stack>
                </RadioGroup>
            </Box>

            {Object.keys(tagCategories).map((category) => (
                <Box key={category} pb='20px'>
                    <Heading size='md' pb='10px'>
                        {category.charAt(0).toUpperCase() + category.slice(1)} Tags
                    </Heading>
                    <Stack direction='column'>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<i className="fas fa-chevron-down"></i>}>
                                Select {category} tags
                            </MenuButton>
                            <MenuList maxHeight="200px" overflowY="auto">
                                <Box p={2}>
                                    <Input
                                        placeholder="Search"
                                        value={searchText[category]}
                                        onChange={(e) => handleSearchChange(category, e)}
                                    />
                                </Box>
                                {tagCategories[category]
                                    .filter((tag) => tag.toLowerCase().includes(searchText[category].toLowerCase()))
                                    .map((tag, index) => (
                                        !checkedTags[category][index] && (
                                            <MenuItem key={tag} onClick={() => handleDropdownChange(category, tag)}>
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
