import ProgressBar from './ProgressBar'
import { TASK_STATUS_PENDING, TASK_STATUS_COMPLETE } from "../../utils/Task"
import { Flex, Box, Heading, Checkbox } from "@chakra-ui/react"

export default function ProjectProgress({ project }) {
    const pending_tasks = project.tasks.filter(task => task.taskStatus === TASK_STATUS_PENDING);
    const complete_tasks = project.tasks.filter(task => task.taskStatus === TASK_STATUS_COMPLETE);

    return (
            <Flex width='100%' mb='10px'>
                <Flex mb='10px' justifyContent='center' align='center' width='50%'>
                    <ProgressBar value={70}>Complete</ProgressBar>
                </Flex>
                <Flex width='50%'justifyContent='center' gap='5%' direction='column'>
                    <Box border='1px solid' width='100%' pl='20px' mb='20px' pr='20px'>
                        <Heading>Complete:</Heading>
                        <Flex direction='column' pb='10px'>
                            {complete_tasks.map((task, index) => (
                                <Checkbox isChecked='y' key={task.taskBody} textAlign='left'>{task.taskBody}</Checkbox>
                            ))
                        }
                        </Flex>
                    </Box>
                    <Box border='1px solid' width='100%' direction='column' pl='20px' pb='20px' pr='20px'>
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