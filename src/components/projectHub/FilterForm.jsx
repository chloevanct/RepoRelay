import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Stack, Heading, Checkbox, Select, Button } from '@chakra-ui/react';
import { toggleTagFilter, clearFilters } from '../../redux/projects/projectSlice.js';
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from '../../utils/tagColorMappings';
import ClearFiltersButton from './ClearFiltersButton';

export default function FilterForm() {
    const dispatch = useDispatch();

    const tagCategories = {
        difficulty: Object.keys(difficultyColorMapping),
        project: Object.keys(projectColorMapping),
        tech: Object.keys(technologyColorMapping)
    };

    const initialCheckedState = Object.keys(tagCategories).reduce((acc, category) => {
        acc[category] = Array(tagCategories[category].length).fill(false);
        return acc;
    }, {});

    const [checkedTags, setCheckedTags] = useState(initialCheckedState);

    const clearAllTags = () => {
        setCheckedTags(initialCheckedState);
        dispatch(clearFilters());
    };

    const handleTagChange = (category, index, tag) => {
        setCheckedTags((prevCheckedTags) => {
            if (category === 'difficulty') {
                // Only one difficulty tag can be selected at a time
                const newDifficultyTags = Array(prevCheckedTags.difficulty.length).fill(false);
                newDifficultyTags[index] = !prevCheckedTags.difficulty[index];
                return {
                    ...prevCheckedTags,
                    [category]: newDifficultyTags
                };
            } else {
                return {
                    ...prevCheckedTags,
                    [category]: [
                        ...prevCheckedTags[category].slice(0, index),
                        !prevCheckedTags[category][index],
                        ...prevCheckedTags[category].slice(index + 1),
                    ]
                };
            }
        });
        const type = category === 'difficulty' ? 'difficultyTag' : `${category}Tags`;
        dispatch(toggleTagFilter({ tag, type }));
    };

    const handleDropdownChange = (category, e) => {
        const tag = e.target.value;
        const index = tagCategories[category].indexOf(tag);
        if (index !== -1) {
            handleTagChange(category, index, tag);
        }
    };

    return (
        <Box textAlign='left'>
            <Box pt='10px' pb='20px'>
                <ClearFiltersButton onClick={clearAllTags} />
            </Box>

            {Object.keys(tagCategories).map((category) => (
                <Box key={category} pb='20px'>
                    <Heading size='md' pb='10px'>
                        {category.charAt(0).toUpperCase() + category.slice(1)} Tags
                    </Heading>
                    <Stack direction='column'>
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
                        <Select
                            placeholder={`Select ${category} tags`}
                            onChange={(e) => handleDropdownChange(category, e)}
                        >
                            {tagCategories[category].map((tag, index) => (
                                !checkedTags[category][index] && (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                )
                            ))}
                        </Select>
                    </Stack>
                </Box>
            ))}
        </Box>
    );
}
