import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../../projectCards/ProjectCardStore'

export default function SearchBar() {
    const dispatch = useDispatch()
    const searchQuery = useSelector((state) => state.cards.searchQuery)

    const handleSearchQueryInputChange = (e) => {
        dispatch(setSearchQuery(e.target.value))
    }

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
            value={searchQuery}
            onChange={handleSearchQueryInputChange}
            border="1px solid #717273"
            borderRadius="8"
            textAlign="right"
            paddingRight="3"
        />
        </InputGroup>
        </>
    )
}