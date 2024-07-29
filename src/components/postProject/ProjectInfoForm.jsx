import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  HStack,
  useToast,
  FormLabel
} from "@chakra-ui/react";
import { DateInput } from "./DateInput";
import { TextInput } from "./TextInput";
import { TagInput } from "./TagInput";
import { TaskInput } from "./TaskInput";
import { DifficultySelector } from "./DifficultySelector";
import { useFormData } from "../../hooks/useFormData";
import {
  difficultyColorMapping,
  projectColorMapping,
  technologyColorMapping,
} from "../../utils/tagColorMappings";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectAsync } from "../../redux/projects/projectCardThunks";
import { fetchUserAsync } from "../../redux/user/userThunks";
import { useNavigate } from 'react-router-dom';
import sanitizeProjectInput from "./sanitization";


/**
 * Creates a parent form component to setup a new project.
 * 
 * @returns {JSX.Element} The rendered project info form component.
 */
export default function ProjectInfoForm() {
  const { formData, handleChange, addToList, removeFromList, handleReset } = useFormData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  /**
   * Validates the form data to ensure all required fields are filled with non-whitespace values.
   *
   * @returns {boolean} True if the form data is valid, otherwise false.
   */
  const validateForm = () => {
    return (
      formData.name.trim() &&
      formData.repoLink.trim() &&
      formData.description.trim() &&
      formData.difficultyTags.length > 0
    );
  };

  /**
   * Handles the form submission, including sanitization and dispatching the add project action.
   *
   * @param {Object} e - The event object.
   * @returns {Promise<void>} 
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!sanitizeProjectInput(formData, toast)) {
      return;
    }

    const tasks = [
      ...formData.tasksCompleted.map((task) => ({
        postedBy: currentUser.userID,
        datePosted: formData.date,
        taskBody: task,
        taskStatus: 'completed',
      })),
      ...formData.tasksToComplete.map((task) => ({
        postedBy: currentUser.userID,
        datePosted: formData.date,
        taskBody: task,
        taskStatus: 'open',
      })),
    ];

    const newProject = {
      projectName: formData.name,
      projectDescription: formData.description,
      projectImgURL: formData.projectImgURL,
      githubURL: formData.repoLink,
      projectOwner: currentUser.userID,
      pastContributors: [],
      subscribedUsers: [],
      postedDate: formData.date,
      lastActivityDate: formData.date,
      difficultyTag: formData.difficultyTags[0],
      projectTags: formData.projectTags,
      techTags: formData.techTags,
      tasks: tasks,
      comments: [],
    };

    try {
      await dispatch(addProjectAsync(newProject)).unwrap();
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(fetchUserAsync(token));
      }

      setIsSubmitted(true);
      toast({
        title: "Project published.",
        description: "Your project has been successfully published.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      handleReset();
      navigate('/home');
    } catch (error) {
      console.error('Error publishing project:', error);
      toast({
        title: "Error publishing project.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Container maxW="container.lg" width="100%" mt={5}>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="gray.50"
        width="100%"
      >
        <Heading as="h3" size="lg" mb={5}>
          Project Info Form
        </Heading>
        <Heading as="h4" size="md" mb={5}>
          Fill out the form below to publish your project
        </Heading>
        <Box as="form" onSubmit={handleFormSubmit} onReset={handleReset}>
          <VStack spacing={4} align="stretch">
            <DateInput value={formData.date} />
            <TextInput
              id="name"
              label="* Project Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextInput
              id="repoLink"
              label="* Project Repo Link"
              value={formData.repoLink}
              onChange={handleChange}
              required
            />
            <TextInput
              id="description"
              label="* Project Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <TextInput
              id="projectImgURL"
              label="Project Profile Image URL"
              value={formData.projectImgURL}
              onChange={handleChange}
            />
            <DifficultySelector
              id="difficultyTag"
              label="* Difficulty Level"
              value={formData.difficultyTags[0] || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "difficultyTags", value: [value] },
                })
              }
              options={Object.keys(difficultyColorMapping)}
            />
            <FormLabel mb={0}>Project Tags</FormLabel>
            <TagInput
              id="projectTag"
              label="Select project tags"
              tags={formData.projectTags}
              tagMapping={projectColorMapping}
              onAdd={(tag) => addToList("projectTags", tag)}
              onRemove={(index) => removeFromList("projectTags", index)}
            />
            <FormLabel mb={0}>Technology Tags</FormLabel>
            <TagInput
              id="techTag"
              label="Select tech tags"
              tags={formData.techTags}
              tagMapping={technologyColorMapping}
              onAdd={(tag) => addToList("techTags", tag)}
              onRemove={(index) => removeFromList("techTags", index)}
            />
            <TaskInput
              id="taskCompleted"
              label="Tasks Completed"
              tasks={formData.tasksCompleted}
              onAdd={(task) => addToList("tasksCompleted", task)}
              onRemove={(index) => removeFromList("tasksCompleted", index)}
            />
            <TaskInput
              id="taskToComplete"
              label="Tasks to Complete"
              tasks={formData.tasksToComplete}
              onAdd={(task) => addToList("tasksToComplete", task)}
              onRemove={(index) => removeFromList("tasksToComplete", index)}
            />
            <HStack>
              <Button
                type="submit"
                colorScheme="teal"
                fontWeight="bold"
                isDisabled={!validateForm()}
              >
                Publish Project
              </Button>
              <Button type="reset" colorScheme="red" fontWeight="bold">
                Clear Inputs
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}
