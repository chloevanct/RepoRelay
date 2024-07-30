import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
  IconButton,
  HStack,
  useToast
} from '@chakra-ui/react';
import { CloseIcon, CheckIcon, ArrowBackIcon } from '@chakra-ui/icons';
import ProgressBar from './ProgressBar';
import { addTaskAsync, updatePartialTaskAsync, deleteTaskAsync } from '../../redux/projects/projectTaskThunks';
import { sanitizeTaskBody, validateTaskBody } from '../../utils/sanitization'; 


/**
 * A component for displaying and managing project tasks, including adding, updating, and deleting tasks.
 * The component provides a visual representation of task progress and allows users to manage tasks by updating their status.
 *
 * @param {Object} project - The project object containing tasks and other details.
 * 
 * @returns {JSX.Element} The rendered ProjectProgress component.
 */
export default function ProjectProgress({ project }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [localTasks, setLocalTasks] = useState(project.tasks || []);
  const [newTaskBody, setNewTaskBody] = useState('');

  useEffect(() => {
    setLocalTasks(project.tasks || []);
  }, [project.tasks]);

  useEffect(() => {
  }, [localTasks]);

  const complete_tasks = useMemo(() => localTasks.filter(task => task && task.taskStatus === 'completed'), [localTasks]);
  const pending_tasks = useMemo(() => localTasks.filter(task => task && task.taskStatus === 'pending'), [localTasks]);
  const open_tasks = useMemo(() => localTasks.filter(task => task && task.taskStatus === 'open'), [localTasks]);

  const percentage_complete = localTasks.length > 0 ? (complete_tasks.length / localTasks.length) * 100 : 0;

  const handleStatusChange = async (taskID, newStatus) => {
    const updatedTasks = localTasks.map(task =>
      task._id === taskID ? { ...task, taskStatus: newStatus } : task
    );
    setLocalTasks(updatedTasks);

    await dispatch(updatePartialTaskAsync({ projectID: project.projectID, taskID, task: { taskStatus: newStatus } }));
  };

  const handleAddTask = async () => {
    if (!project.projectID) {
      console.error('Project ID is undefined');
      return;
    }

    const sanitizedTaskBody = sanitizeTaskBody(newTaskBody);
    if (!validateTaskBody(sanitizedTaskBody, toast)) {
      return;
    }

    const newTask = {
      postedBy: currentUser.userID,
      datePosted: new Date().toISOString(),
      taskBody: sanitizedTaskBody,
      taskStatus: 'open',
    };

    const resultAction = await dispatch(addTaskAsync({ projectID: project.projectID, task: newTask }));
    if (addTaskAsync.fulfilled.match(resultAction)) {
      const updatedTasks = resultAction.payload.tasks;
      console.log('Tasks updated:', updatedTasks);
      setLocalTasks(updatedTasks);
    } else {
      console.error('Failed to add task:', resultAction.error);
    }
    onClose();
    setNewTaskBody('');
  };

  const handleDeleteTask = async (taskID) => {
    const resultAction = await dispatch(deleteTaskAsync({ projectID: project.projectID, taskID }));
    if (deleteTaskAsync.fulfilled.match(resultAction)) {
      const updatedTasks = localTasks.filter(task => task._id !== taskID);
      setLocalTasks(updatedTasks);
      console.log('Task deleted:', taskID);
    } else {
      console.error('Failed to delete task:', resultAction.error);
    }
  };

  const isOwner = currentUser.userID === project.projectOwner;
  const isSubscribedUser = project.subscribedUsers.includes(currentUser.userID);
  const canEdit = isOwner || isSubscribedUser;

  return (
    <Flex direction={['column', 'column', 'row']} width='100%' mb='10px' gap={4}>
      <Flex
        bg='gray.50'
        shadow='md'
        borderWidth='1px'
        borderRadius='lg'
        p={4}
        mb='10px'
        justifyContent='center'
        width={['100%', '100%', '50%']}
      >
        <ProgressBar value={percentage_complete} />
      </Flex>
      <Flex width={['100%', '100%', '50%']} justifyContent='center' gap='5%' direction='column'>
        <Box bg='gray.50' shadow='md' borderWidth='1px' borderRadius='lg' p={4} width='100%' mb={4}>
          <Heading size='md' mb={2}>Complete:</Heading>
          <Flex direction='column' pb='10px'>
            {complete_tasks.map((task) => (
              <HStack key={task._id} justify='space-between' mb={1}>
                {canEdit && (
                  <Flex>
                    <IconButton
                      aria-label='Move to pending'
                      icon={<ArrowBackIcon />}
                      size='xs'
                      colorScheme='yellow'
                      onClick={() => handleStatusChange(task._id, 'pending')}
                    />
                  </Flex>
                )}
                <Box textAlign='left'>{task.taskBody}</Box>
                {canEdit && (
                  <IconButton
                    aria-label='Delete task'
                    icon={<CloseIcon />}
                    size='xs'
                    colorScheme='red'
                    onClick={() => handleDeleteTask(task._id)}
                  />
                )}
              </HStack>
            ))}
          </Flex>
        </Box>
        <Box bg='gray.50' shadow='md' borderWidth='1px' borderRadius='lg' p={4} width='100%' mb={4}>
          <Heading size='md' mb={2}>In progress:</Heading>
          <Flex direction='column'>
            {pending_tasks.map((task) => (
              <HStack key={task._id} justify='space-between' mb={1}>
                {canEdit && (
                  <Flex>
                    <IconButton
                      aria-label='Move to complete'
                      icon={<CheckIcon />}
                      size='xs'
                      colorScheme='green'
                      onClick={() => handleStatusChange(task._id, 'completed')}
                    />
                    <IconButton
                      aria-label='Move to todo'
                      icon={<ArrowBackIcon />}
                      size='xs'
                      colorScheme='yellow'
                      ml={1}
                      onClick={() => handleStatusChange(task._id, 'open')}
                    />
                  </Flex>
                )}
                <Box textAlign='left'>{task.taskBody}</Box>
                {canEdit && (
                  <IconButton
                    aria-label='Delete task'
                    icon={<CloseIcon />}
                    size='xs'
                    colorScheme='red'
                    onClick={() => handleDeleteTask(task._id)}
                  />
                )}
              </HStack>
            ))}
          </Flex>
        </Box>
        <Box bg='gray.50' shadow='md' borderWidth='1px' borderRadius='lg' p={4} width='100%' mb={4}>
          <Heading size='md' mb={2}>Todo:</Heading>
          <Flex direction='column'>
            {open_tasks.map((task) => (
              <HStack key={task._id} justify='space-between' mb={1}>
                {canEdit && (
                  <Flex>
                    <IconButton
                      aria-label='Move to pending'
                      icon={<CheckIcon />}
                      size='xs'
                      colorScheme='green'
                      onClick={() => handleStatusChange(task._id, 'pending')}
                    />
                  </Flex>
                )}
                <Box textAlign='left'>{task.taskBody}</Box>
                {canEdit && (
                  <IconButton
                    aria-label='Delete task'
                    icon={<CloseIcon />}
                    size='xs'
                    colorScheme='red'
                    onClick={() => handleDeleteTask(task._id)}
                  />
                )}
              </HStack>
            ))}
          </Flex>
          {canEdit && (
            <Button size='sm' mt={4} onClick={onOpen}>
              Add New Task
            </Button>
          )}
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Task Description</FormLabel>
              <Textarea
                value={newTaskBody}
                onChange={(e) => setNewTaskBody(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' size='sm' mr={3} onClick={handleAddTask}>
              Add Task
            </Button>
            <Button variant='ghost' size='sm' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
