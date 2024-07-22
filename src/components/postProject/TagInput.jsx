import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  HStack,
  Button,
  Box,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteButton } from "./DeleteButton";
import Tag from "../Tag";

export function TagInput({ id, label, tags, tagMapping, onAdd, onRemove }) {
  const [searchText, setSearchText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      onAdd(tag);
      setSearchText("");
      onClose();
    }
  };

  const handleRemoveTag = (index) => {
    onRemove(index);
    setSearchText("");
  };

  const filteredTags = Object.keys(tagMapping).filter(
    (tag) =>
      tag.toLowerCase().includes(searchText.toLowerCase()) && !tags.includes(tag)
  );

  return (
    <FormControl>
      <HStack>
        <Menu isOpen={isOpen} onClose={onClose}>
          <MenuButton as={Button} onClick={onOpen} px="1" fontSize="md">
            {label}
          </MenuButton>
          <MenuList maxHeight="200px" overflowY="auto">
            <Box p={2}>
              <Input
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fontSize="md"
              />
            </Box>
            {filteredTags.map((tag) => (
              <MenuItem key={tag} onClick={() => handleAddTag(tag)} fontSize="md">
                {tag}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
      {tags.length > 0 && (
        <Box mt={2} p={4} borderWidth="1px" borderRadius="lg">
          <Wrap spacing={10}>
            {tags.map((tag, index) => (
              <WrapItem key={index}>
                <HStack spacing={2}>
                  <Tag tagName={tag} colorMapping={tagMapping} />
                  <DeleteButton onClick={() => handleRemoveTag(index)} />
                </HStack>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
    </FormControl>
  );
}
