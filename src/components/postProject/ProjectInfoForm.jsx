import { Box, Button, Container, Heading, VStack, HStack } from "@chakra-ui/react";
import { DateInput } from "./DateInput";
import { TextInput } from "./TextInput";
import { TagInput } from "./TagInput";
import { TaskInput } from "./TaskInput";
import { useFormData } from "../../hooks/useFormData";
import { difficultyColorMapping, projectColorMapping, technologyColorMapping } from "../../utils/tagColorMappings";

export default function ProjectInfoForm() {

  const { formData, handleChange, addToList, removeFromList, handleReset, handleSubmit } = useFormData();

  return (
    <Container maxW="container.lg" width="100%" mt={5}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50" width="100%">
        <Heading as="h3" size="lg" mb={5}>
          Project Info Form
        </Heading>
        <Heading as="h4" size="md" mb={5}>
          Fill out the form below to publish your project
        </Heading>
        <Box as="form" onSubmit={handleSubmit} onReset={handleReset}>
          <VStack spacing={4} align="stretch">
            <DateInput value={formData.date} />
            <TextInput id="name" label="Project Name" value={formData.name} onChange={handleChange} required />
            <TextInput id="repoLink" label="Project Repo Link" value={formData.repoLink} onChange={handleChange} required />
            <TextInput id="description" label="Project Description" value={formData.description} onChange={handleChange} required />
            <TagInput
              id="difficultyTag"
              label="Difficulty Tags"
              tags={formData.difficultyTags}
              tagMapping={difficultyColorMapping}
              onAdd={(tag) => addToList("difficultyTags", tag)}
              onRemove={(index) => removeFromList("difficultyTags", index)}
              allowMultiple ={false}
            />
            <TagInput
              id="projectTag"
              label="Project Tags"
              tags={formData.projectTags}
              tagMapping={projectColorMapping}
              onAdd={(tag) => addToList("projectTags", tag)}
              onRemove={(index) => removeFromList("projectTags", index)}
              allowMultiple ={true}
            />
            <TagInput
              id="techTag"
              label="Technology Tags"
              tags={formData.techTags}
              tagMapping={technologyColorMapping}
              onAdd={(tag) => addToList("techTags", tag)}
              onRemove={(index) => removeFromList("techTags", index)}
              allowMultiple ={true}
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
              <Button type="submit" colorScheme="teal">
                Publish Project
              </Button>
              <Button type="reset" colorScheme="red">
                Clear Inputs
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}