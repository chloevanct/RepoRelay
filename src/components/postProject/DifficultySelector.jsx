import React from "react";
import { FormControl, FormLabel, RadioGroup, Radio, VStack } from "@chakra-ui/react";


/**
 * Creates a form component to set the project difficulty level.
 * @param {string} id - The id of the form control.
 * @param {string} label - The label for the form control.
 * @param {string} value - The selected value of the form.
 * @param {Function} onChange - The callback function to handle changes.
 * @param {Array<string>} options - The list of difficulty options to display.
 *  ** Expects "Beginner", "Intermediate", and "Advanced".
 * @returns {JSX.Element} The rendered difficulty selector component.
 */
export function DifficultySelector({ id, label, value, onChange, options }) {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <RadioGroup id={id} value={value} onChange={onChange}>
        <VStack align="start">
          {options.map((option) => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
    </FormControl>
  );
}
