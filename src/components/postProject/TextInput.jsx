import { FormControl, FormLabel, Input } from "@chakra-ui/react";

/**
 * Creates a text input form field component.
 *
 * @param {string} id - The id of the input field.
 * @param {string} label - The label displayed above the input field.
 * @param {string} value - The current value of the input field.
 * @param {Function} onChange - The callback function to handle changes in the input field.
 * @param {boolean} required - Indicates whether the input field is required. Defaults to false.
 *
 * @returns {JSX.Element} The rendered text input component.
 */
export function TextInput({ id, label, value, onChange, required = false }) {
	return (
		<FormControl>
			<FormLabel htmlFor={id}>{label}</FormLabel>
			<Input id={id} name={id} value={value} onChange={onChange} required={required} />
		</FormControl>
	)
}
