import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  HStack,
  useToast,
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
import { useDispatch } from "react-redux";
import { addProjectAsync } from "../../redux/projects/projectCardThunks";

import { useUser } from "../../hooks/useUser";

export default function ProjectInfoForm() {
  const { formData, handleChange, addToList, removeFromList, handleReset } =
    useFormData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const { currentUser } = useUser();

  // console.log(currentUser);

  const validateForm = () => {
    return (
      formData.name &&
      formData.repoLink &&
      formData.description &&
      formData.difficultyTags.length > 0
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

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
      projectID: Math.floor(Math.random() * 1000000).toString(), // TEMPORARY RANDOM GENERATE ID
      projectName: formData.name,
      projectDescription: formData.description,
      projectImg: "",
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

    dispatch(addProjectAsync(newProject));
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
              label="Project Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextInput
              id="repoLink"
              label="Project Repo Link"
              value={formData.repoLink}
              onChange={handleChange}
              required
            />
            <TextInput
              id="description"
              label="Project Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <DifficultySelector
              id="difficultyTag"
              label="Difficulty Level"
              value={formData.difficultyTags[0] || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "difficultyTags", value: [value] },
                })
              }
              options={Object.keys(difficultyColorMapping)}
            />
            <TagInput
              id="projectTag"
              label="Project Tags"
              tags={formData.projectTags}
              tagMapping={projectColorMapping}
              onAdd={(tag) => addToList("projectTags", tag)}
              onRemove={(index) => removeFromList("projectTags", index)}
            />
            <TagInput
              id="techTag"
              label="Technology Tags"
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
