import ProgressBar from './ProgressBar'
import { TASK_STATUS_PENDING, TASK_STATUS_COMPLETE } from "../../utils/Task"
import { Flex, Box, Heading, Checkbox } from "@chakra-ui/react"

export default function ProjectProgress({ project }) {
    const pending_tasks = project.tasks.filter(task => task.taskStatus === TASK_STATUS_PENDING);
    const complete_tasks = project.tasks.filter(task => task.taskStatus === TASK_STATUS_COMPLETE);

    // BASIC MEASURE OF COMPLETION 
    //   Eventaully may want to have users enter this on their own?
    const percentage_compelete = pending_tasks.length / (complete_tasks.length + pending_tasks.length) * 100;

    return (
            <Flex width='100%' mb='10px' gap={4}>
                <Flex bg="gray.50" shadow="md" borderWidth="1px" borderRadius="lg" p={4} mb='10px' justifyContent='center' width='50%'>
                    <ProgressBar value={percentage_compelete} >Complete</ProgressBar>
                </Flex>
                <Flex width='50%'justifyContent='center' gap='5%' direction='column'>
                    <Box bg="gray.50" shadow="md" borderWidth="1px" borderRadius="lg" p={4} width='100%'>
                        <Heading>Complete:</Heading>
                        <Flex direction='column' pb='10px'>
                            {complete_tasks.map((task, index) => (
                                <Checkbox isChecked='y' key={task.taskBody} textAlign='left'>{task.taskBody}</Checkbox>
                            ))
                        }
                        </Flex>
                    </Box>
                    <Box bg="gray.50" shadow="md" borderWidth="1px" borderRadius="lg" p={4} width='100%'>
                        <Heading>Todo:</Heading>
                        <Flex direction='column'>
                            {pending_tasks.map((task, index) => (
                                <Checkbox isChecked='' key={task.taskBody} textAlign='left'>{task.taskBody}</Checkbox>
                                ))
                            }
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
    )
}