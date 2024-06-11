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
                <Progress width='80%' value='70' hasStripe ></Progress>
                <Text ml='10px'>70% Complete!</Text>
            </Flex>
            <Flex justifyContent='center' gap='5%'>
                <Flex border='1px solid' width='100%' direction='column' pl='20px' pb='20px' pr='20px'>
                    <Heading>Complete:</Heading>
                    {complete_tasks.map((task) => (
                        <Checkbox isChecked='y'>{task.title}</Checkbox>
                    ))
                }
                </Flex>
                <Flex border='1px solid' width='100%' direction='column' pl='20px' pb='20px' pr='20px'>
                    <Heading>Todo:</Heading>
                    {complete_tasks.map((task) => (
                        <Checkbox>{task.title}</Checkbox>
                    ))
                }
                </Flex>
            </Flex>
        </Flex>

    )
}