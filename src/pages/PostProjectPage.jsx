import Header from '../components/Header'
import ProjectInfoForm from '../components/postProject/ProjectInfoForm'
import './PostProjectPage.css'

export default function PostProjectPage() {
    return (
        <div id='postProjectPage'>
            <Header></Header>
            <p>Post a Project sub-heading</p>
            <ProjectInfoForm></ProjectInfoForm>
        </div>
    )
}