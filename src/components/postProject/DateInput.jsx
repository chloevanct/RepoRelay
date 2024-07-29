import { FormControl, FormLabel, Input } from "@chakra-ui/react";

/**
 * Creates a read-only date input component for the ProjectInfoForm.
 * 
 * @param {string} value - The date value to be shown
 * @returns {JSX.Element} The rendered date input component.
 */
export function DateInput({ value }) {
	return (
		<FormControl>
			<FormLabel htmlFor="date">Date</FormLabel>
			<Input id="date" name="date" value={value} readOnly />
		</FormControl>
	);
}
