import {
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons"

export default function SearchBar() {
    return (
        <>
        <InputGroup size="sm" width={{base:"80%", md:"30%"}}>
            <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="#BFBCBC"/>}
            paddingLeft="3"
        />
        <Input type="text"
            placeholder="SEARCH PROJECTS"
            border="1px solid #717273"
            borderRadius="8"
            textAlign="right"
            paddingRight="3"
        />
        </InputGroup>
        </>
    )
}