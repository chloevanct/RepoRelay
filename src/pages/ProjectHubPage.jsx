import Header from '../components/Header'
import SearchBar from '../components/projectHub/SearchBar'
import FilterForm from '../components/projectHub/FilterForm'
import ProjectListHeader from '../components/projectHub/ProjectListHeader'
import SortBy from '../components/projectHub/SortBy'
import ProjectCards from '../components/projectCards/ProjectCards'
import './ProjectHubPage.css'

export default function ProjectHubPage() {
    return (
        <div id='projectHubPage'>
            <Header></Header>
            <div id='projectHubBody'>
                <SearchBar></SearchBar>
                <div id='projectDisplay'>
                    <FilterForm id='filterForm'></FilterForm>
                    <div id='projectList'>
                        <div id='projectListHeading'>
                            <ProjectListHeader></ProjectListHeader>
                            <SortBy></SortBy>
                        </div>
                        <ProjectCards></ProjectCards>
                    </div>
                </div>
            </div>
        </div>
    )
}