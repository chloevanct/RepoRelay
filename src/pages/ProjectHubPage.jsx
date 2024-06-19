import Header from '../components/Header'
import SearchBarHeader from '../components/projectHub/SearchBarHeader/SearchBarHeader'
import FilterForm from '../components/projectHub/FilterForm'
import ProjectListHeader from '../components/projectHub/ProjectListHeader/ProjectListHeader'
import ProjectCards from '../components/projectCards/ProjectCards'
import { Flex } from '@chakra-ui/react'

export default function ProjectHubPage() {
    return (
        <Flex id='projectHubPage' direction='column' width='100%'>
            <Header></Header>
            <Flex id='projectHubBody' direction='column' width='100%'>
                <SearchBarHeader></SearchBarHeader>
                <Flex id='projectDisplay' gap='50px' width='100%'>
                    <FilterForm id='filterForm'></FilterForm>
                    <Flex id='projectList' direction='column' width='80%'>
                        <Flex id='projectListHeading' gap='30px'>
                            <ProjectListHeader></ProjectListHeader>
                        </Flex>
                        <ProjectCards></ProjectCards>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}