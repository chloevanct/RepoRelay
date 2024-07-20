import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text } from '@chakra-ui/react';

export default function SortByMenu() {
    const [chosenOption, setChosenOption] = useState('Most Relevant');

    const handleMenuItemClick = (option) => {
        setChosenOption(option);
    };

    return (
        <Flex alignItems="center" justifyContent="center" p={["1", "3"]}>
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
                    <MenuList 
                        sx={{
                            color: '#5271FF',
                        }}
                        minW='0' // required to set the width properly, for some reason
                        w='auto'
                    >
                        <MenuItem 
                            onClick={() => handleMenuItemClick('Most Relevant')} 
                            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                        >
                            Most Relevant</MenuItem>
                        <MenuItem 
                            onClick={() => handleMenuItemClick('Most Viewed')}
                            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                        >
                            Most Viewed</MenuItem>
                        <MenuItem 
                            onClick={() => handleMenuItemClick('Most Active')} 
                            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                        >
                            Most Active</MenuItem>
                        <MenuItem 
                            onClick={() => handleMenuItemClick('Submission Date')} 
                            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                        >
                            Submission Date</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}