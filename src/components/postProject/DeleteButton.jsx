import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

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