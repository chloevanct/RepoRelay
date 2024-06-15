import ProgressBar from './ProgressBar'
import { Flex, Progress, Text, Box, Heading, Checkbox } from "@chakra-ui/react"

// Mock tasks
const complete_tasks = [
    {
        title: "Task 1 longer longer longer longer longer longer longer longer longer longer longer longer longer longer",
        body: "A brief description of the task"
    },
    {
        title: "Task 2",
        body: "A brief description of the task"
    },
    {
        title: "Task 3",
        body: "A brief description of the task"
    },
    {
        title: "Task 4",
        body: "A brief description of the task"
    },
    {
        title: "Task 5",
        body: "A brief description of the task"
    },
    {
        title: "Task 6",
        body: "A brief description of the task"
    },
    {
        title: "Task 7",
        body: "A brief description of the task"
    }
]

export default function ProjectProgress({ card }) {
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
                                <Checkbox isChecked='y' key={index} textAlign='left'>{task.title}</Checkbox>
                            ))
                        }
                        </Flex>
                    </Box>
                    <Box border='1px solid' width='100%' direction='column' pl='20px' pb='20px' pr='20px'>
                        <Heading>Todo:</Heading>
                        <Flex direction='column'>
                            {complete_tasks.map((task, index) => (
                                <Checkbox isChecked='' key={index} textAlign='left'>{task.title}</Checkbox>
                                ))
                            }
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
    )
}