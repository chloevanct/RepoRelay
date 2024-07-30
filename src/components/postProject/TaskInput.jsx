import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { FormControl, FormLabel, HStack, Input, Button, Box, List, ListItem, Text } from "@chakra-ui/react";

/**
 * Creates a form field component for adding and displaying tasks.
 *
 * @param {string} id - The id of the input field.
 * @param {string} label - The label displayed above the input field.
 * @param {Array<string>} tasks - The list of tasks.
 * @param {Function} onAdd - The callback function to add a task.
 * @param {Function} onRemove - The callback function to remove a task.
 *
 * @returns {JSX.Element} The rendered task input component.
 */
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
				<Button colorScheme="teal" fontWeight='bold' onClick={handleAddTask}>
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