import Header from '../components/Header'
import DetailedProjectInfo from '../components/projectDetails/DetailedProjectInfo'
import CommentsSection from '../components/projectDetails/CommentsSection'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Divider } from '@chakra-ui/react'

export default function ProjectDetailsPage() {
    
    // The project loads by passing the ID as a parameter in the link (see ProjectCard.jsx). 
    const { projectId } = useParams();
    const projects = useSelector((state) => state.projects.projects);
    const project = projects.find(p => p.projectID === projectId);

    return (
        <>
            <Header />
            <Box mt={10}>
                <DetailedProjectInfo project={project} />
                <Divider />
                <CommentsSection project={project} />
            </Box>
        </>
    )
}