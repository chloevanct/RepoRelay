import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text } from '@chakra-ui/react';

export default function SortByMenu({ chosenOption, setChosenOption }) {
    const handleMenuItemClick = (option) => {
        setChosenOption(option);
    };

    return (
        <Flex alignItems="center" justifyContent="center" p={["1", "3"]}>
            <Flex alignItems="center">
            <Text mr="1" display="flex" alignItems="center" fontSize={['0.6rem', '0.6rem', '1.2rem']}>Sort by:</Text>
                <Menu>
                    <MenuButton as={Button}
                                fontSize={['0.6rem', '0.6rem', '1.2rem']}
                                sx={{
                                    bg: 'transparent',
                                    border: 'none',
                                    _hover: { bg: 'transparent', border: 'none'},
                                    _active: { bg: 'transparent', border: 'none'},
                                    color: '#5271FF',
                                    display: 'flex',
                                    alignItems:'center',
                                    width: ['100px', '120px', '140px'],
                                    justifyContent: 'center'
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
                            onClick={() => handleMenuItemClick('Newest')}
                            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                        >
                            Newest</MenuItem>
                        <MenuItem
                            onClick={() => handleMenuItemClick('Oldest')}
                            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                        >
                            Oldest</MenuItem>
                        <MenuItem
                            onClick={() => handleMenuItemClick('Most Active')}
                            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
                        >
                            Most Active</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}