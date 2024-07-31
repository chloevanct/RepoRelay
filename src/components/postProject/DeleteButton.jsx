import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

/**
 * Creates a button component to delete added tags or tasks.
 * 
 * @param {Function} onClick - The callback function to handle button click events.
 * @returns {JSX.Element} The rendered dalete button component.
 */
export function DeleteButton({ onClick }) {
	return (
		<IconButton
			size="sm"
			colorScheme="red"
			aria-label="Delete"
			icon={<DeleteIcon />}
			onClick={onClick}
		/>
	);
}