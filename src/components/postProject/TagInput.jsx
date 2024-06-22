import { useState } from "react";
import { FormControl, FormLabel, HStack, Select, Button, Box, Wrap, WrapItem } from "@chakra-ui/react";
import { DeleteButton } from "./DeleteButton";
import Tag from "../Tag";

export function TagInput({ id, label, tags, tagMapping, onAdd, onRemove }) {
  const [selectedTag, setSelectedTag] = useState("");

  const handleSelectChange = (e) => setSelectedTag(e.target.value);

  const handleAddTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      onAdd(selectedTag);
      setSelectedTag("");
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <HStack>
        <Select id={id} name={id} value={selectedTag} onChange={handleSelectChange} placeholder="Select tag">
          {Object.keys(tagMapping).map((tagName) => (
            <option key={tagName} value={tagName}>
              {tagName}
            </option>
          ))}
        </Select>
        <Button colorScheme="teal" onClick={handleAddTag}>
          Add Tag
        </Button>
      </HStack>
      {tags.length > 0 && (
        <Box mt={2} p={4} borderWidth="1px" borderRadius="lg">
          <Wrap spacing={10}>
            {tags.map((tag, index) => (
              <WrapItem key={index}>
                <HStack spacing={2}>
                  <Tag tagName={tag} colorMapping={tagMapping} />
                  <DeleteButton onClick={() => onRemove(index)} />
                </HStack>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
    </FormControl>
  );
}
