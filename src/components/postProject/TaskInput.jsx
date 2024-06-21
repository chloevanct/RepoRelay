import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { FormControl, FormLabel, HStack, Input, Button, Box, List, ListItem, Text } from "@chakra-ui/react";


export function TaskInput({ id, label, tasks, onAdd, onRemove }) {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e) => setInputValue(e.target.value);

	const handleAddTask = () => {
		onAdd(inputValue);
		setInputValue("");
	};

	return (
		<FormControl>
			<FormLabel htmlFor={id}>{label}</FormLabel>
			<HStack>
				<Input id={id} name={id} value={inputValue} onChange={handleInputChange} />
				<Button colorScheme="teal" onClick={handleAddTask}>
					Add Task
				</Button>
			</HStack>
			{tasks.length > 0 && (
				<Box mt={2} p={4} borderWidth="1px" borderRadius="lg">
					<List spacing={2}>
						{tasks.map((task, index) => (
							<ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
								<Text mr={10}>{task}</Text>
								<DeleteButton onClick={() => onRemove(index)} />
							</ListItem>
						))}
					</List>
				</Box>
			)}
		</FormControl>
	);
};