import { useState, useEffect } from "react";
import { getCurrentDateTime } from "../utils/dateUtils";

export function useFormData() {

	const initialFormState = {
		date: getCurrentDateTime(),
		name: "",
		repoLink: "",
		description: "",
		projectTags: [],
		techTags: [],
		tasksCompleted: [],
		tasksToComplete: [],
	}

	const [formData, setFormData] = useState(initialFormState);

	useEffect(() => {
		const interval = setInterval(() => {
		setFormData((prevState) => ({
			...prevState,
			date: getCurrentDateTime(),
		}));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
		...prevState,
		[name]: value,
		}));
	};

	const addToList = (field, value) => {
		if (value.trim() === "") return;
		setFormData((prevState) => ({
		...prevState,
		[field]: [...prevState[field], value],
		}));
	};

	const removeFromList = (field, index) => {
		setFormData((prevState) => ({
		...prevState,
		[field]: prevState[field].filter((_, i) => i !== index),
		}));
	};

	const handleReset = () => {
		setFormData(initialFormState);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		handleReset();
	};

	return {
		formData,
		handleChange,
		addToList,
		removeFromList,
		handleReset,
		handleSubmit,
	};
};
