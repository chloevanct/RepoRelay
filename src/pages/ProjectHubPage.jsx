import Header from '../components/Header'
import SearchBarHeader from '../components/projectHub/SearchBarHeader/SearchBarHeader'
import FilterForm from '../components/projectHub/FilterForm'
import ProjectListHeader from '../components/projectHub/ProjectListHeader/ProjectListHeader'
import ProjectCards from '../components/ProjectCards'
import './ProjectHubPage.css'

export default function ProjectHubPage() {
    return (
        <div id='projectHubPage'>
            <Header></Header>
            <div id='projectHubBody'>
                <SearchBarHeader></SearchBarHeader>
                <div id='projectDisplay'>
                    <FilterForm></FilterForm>
                    <div id='projectList'>
                        <div id='projectListHeading'>
                            <ProjectListHeader></ProjectListHeader>
                        </div>
                        <ProjectCards></ProjectCards>
                    </div>
                </div>
            </div>
        </div>
    )
}