import ProgressBar from './ProgressBar'
import { Flex, Progress, Text, Box, Heading, Checkbox } from "@chakra-ui/react"

// Mock tasks
const complete_tasks = [
    {
        title: "Task 1",
        body: "A brief description of the task"
    },
    {
        title: "Task 2",
        body: "A brief description of the task"
    },
    {
        title: "Task 3",
        body: "A brief description of the task"
    }
]

export default function ProjectProgress({ card }) {
    return (
        <Flex direction='column' mb='10px'>
            <Flex mb='10px' justifyContent='center' align='center'>
                <ProgressBar value={70}>Complete</ProgressBar>
            </Flex>
            <Flex justifyContent='center' gap='5%'>
                <Flex border='1px solid' width='100%' direction='column' pl='20px' pb='20px' pr='20px'>
                    <Heading>Complete:</Heading>
                    {complete_tasks.map((task, index) => (
                        <Checkbox isChecked='y' key={index}>{task.title}</Checkbox>
                    ))
                }
                </Flex>
                <Flex border='1px solid' width='100%' direction='column' pl='20px' pb='20px' pr='20px'>
                    <Heading>Todo:</Heading>
                    {complete_tasks.map((task, index) => (
                        <Checkbox key={index}>{task.title}</Checkbox>
                    ))
                }
                </Flex>
            </Flex>
        </Flex>

    )
}