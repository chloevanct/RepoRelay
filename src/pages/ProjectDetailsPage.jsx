import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import { getProjectAsync } from '../redux/projects/projectCardThunks'
import Header from '../components/Header'
import DetailedProjectInfo from '../components/projectDetails/DetailedProjectInfo'
import CommentsSection from '../components/projectDetails/CommentsSection'

import { Box, Divider } from '@chakra-ui/react'

export default function ProjectDetailsPage() {
    
    // projectId passed as a parameter in the link (see ProjectCard.jsx) 
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const resultAction = await dispatch(getProjectAsync(projectId));
                const projectData = unwrapResult(resultAction);
                setProject(projectData);
            } catch (error) {
                console.error('Failed to load project:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [dispatch, projectId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    console.log(project)

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