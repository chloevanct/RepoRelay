import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export function TextInput({ id, label, value, onChange, required = false }) {
	return (
		<FormControl>
			<FormLabel htmlFor={id}>{label}</FormLabel>
			<Input id={id} name={id} value={value} onChange={onChange} required={required} />
		</FormControl>
	)
}
