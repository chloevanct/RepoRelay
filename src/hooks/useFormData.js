import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentDateTime } from "../utils/dateUtils";
import { addProject } from "../redux/projects/projectSlice";
import { TASK_STATUS_PENDING, TASK_STATUS_COMPLETE } from "../utils/Task";


// Custom hook to manage form data for adding a new project card
export function useFormData() {
    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Initial state for the form data
    const initialFormState = {
        date: getCurrentDateTime(),
        name: "",
        repoLink: "",
        description: "",
        projectImgURL: "",
        difficultyTags: [],
        projectTags: [],
        techTags: [],
        tasksCompleted: [],
        tasksToComplete: [],
    };

    // State to manage the form data
    const [formData, setFormData] = useState(initialFormState);

    // Effect to update the date and time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setFormData((prevState) => ({
                ...prevState,
                date: getCurrentDateTime(),
            }));
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Handle input changes and update the form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Add an item to a list field in the form data
    const addToList = (field, value) => {
        if (value.trim() === "") return;
        setFormData((prevState) => ({
            ...prevState,
            [field]: [...prevState[field], value],
        }));
    };

    // Remove an item from a list field in the form data
    const removeFromList = (field, index) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: prevState[field].filter((_, i) => i !== index),
        }));
    };

    // Reset the form data to its initial state
    const handleReset = () => {
        setFormData(initialFormState);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the addCard action with the form data
        const tasks = [
            ...formData.tasksCompleted.map(task => ({
              postedBy: "username123",
              datePosted: formData.date,
              taskBody: task,
              taskStatus: TASK_STATUS_COMPLETE
            })),
            ...formData.tasksToComplete.map(task => ({
              postedBy: "username123",
              datePosted: formData.date,
              taskBody: task,
              taskStatus: TASK_STATUS_PENDING
            }))
          ];

        dispatch(addProject({
            projectID: Math.floor(Math.random() * (1000000)).toString(), // TEMPORARY RANDOM GENERATE ID
            projectName: formData.name,
            projectDescription: formData.description,
            projectImg: formData.projectImgURL,
            githubURL: formData.repoLink,
            projectOwner: "username123",
            pastContributors: [],
            subscribedUsers: [],
            postedDate: formData.date,
            lastActivityDate: formData.date,
            difficultyTag: formData.difficultyTags[0],
            projectTags: formData.projectTags,
            techTags: formData.techTags,
            tasks: tasks,
            comments: []
            
        }));
        // Reset the form after submission
        handleReset();
    };

    // Return the form data and handlers for use in a component
    return {
        formData,
        handleChange,
        addToList,
        removeFromList,
        handleReset,
        handleSubmit,
    };
};