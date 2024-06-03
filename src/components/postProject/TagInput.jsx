import { useState } from "react";
import { FormControl, FormLabel, HStack, Input, Button, Box, Wrap, WrapItem, Text, IconButton } from "@chakra-ui/react";
import { DeleteButton } from "./DeleteButton";

export function TagInput({ id, label, tags, onAdd, onRemove }) {
	const [inputValue, setInputValue] = useState("");
	
	const handleInputChange = (e) => setInputValue(e.target.value);

	const handleAddTag = () => {
		onAdd(inputValue);
		setInputValue("");
	};
	
	return (
		<FormControl>
			<FormLabel htmlFor={id}>{label}</FormLabel>
			<HStack>
				<Input id={id} name={id} value={inputValue} onChange={handleInputChange} />
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
									<Text>{tag}</Text>
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