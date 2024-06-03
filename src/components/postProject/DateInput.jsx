import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export function DateInput({ value }) {
	return (
		<FormControl>
			<FormLabel htmlFor="date">Date</FormLabel>
			<Input id="date" name="date" value={value} readOnly />
		</FormControl>
	);
}
