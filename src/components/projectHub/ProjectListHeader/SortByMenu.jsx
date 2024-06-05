import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text } from '@chakra-ui/react';

export default function SortByMenu() {
    const [chosenOption, setChosenOption] = useState('Most Relevant');

    const handleMenuItemClick = (option) => {
        setChosenOption(option);
    };

    return (
        <Flex alignItems="center" justifyContent="center" p="3">
            <Flex alignItems="center">
            <Text mr="1" display="flex" alignItems="center">Sort by:</Text>
                <Menu>
                    <MenuButton as={Button}
                                sx={{
                                    bg: 'transparent',
                                    border: 'none',
                                    _hover: { bg: 'transparent', border: 'none'},
                                    _active: { bg: 'transparent', border: 'none'},
                                    color: '#5271FF',
                                    display: 'flex',
                                    alignItems:'center'
                                }}
                                    >
                        {chosenOption}
                    </MenuButton>
                    <MenuList sx={{color: '#5271FF'}}>
                        <MenuItem onClick={() => handleMenuItemClick('Most Relevant')}>Most Relevant</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Most Viewed')}>Most Viewed</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Most Active')}>Most Active</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Submission Date')}>Submission Date</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}