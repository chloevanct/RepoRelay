import { useState } from "react";
import { FormControl, FormLabel, HStack, Select, Button, Box, Wrap, WrapItem} from "@chakra-ui/react";
import { DeleteButton } from "./DeleteButton";
import Tag from "../Tag";


export function TagInput({ id, label, tags, tagMapping, onAdd, onRemove, allowMultiple }) {
	// State to manage the currently selected tag
	const [selectedTag, setSelectedTag] = useState("");

	// Handler for select input change
	const handleSelectChange = (e) => setSelectedTag(e.target.value);

    // Handler for adding a new tag
    const handleAddTag = () => {
        // Check if a tag is selected and if it is not already in the tags list
        if (selectedTag && !tags.includes(selectedTag)) {
            // Add the selected tag if multiple tags are allowed or if no tags are currently selected
            if (allowMultiple || tags.length === 0) {
                onAdd(selectedTag); // Call the onAdd callback with the selected tag
                setSelectedTag(""); // Reset the selected tag
            }
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
};