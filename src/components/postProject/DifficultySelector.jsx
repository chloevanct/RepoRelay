import React from "react";
import { FormControl, FormLabel, RadioGroup, Radio, VStack } from "@chakra-ui/react";

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
