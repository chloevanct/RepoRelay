import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const project = useSelector((state) => state.projects.projects.find(p => p.projectID === projectId));
    const loading = useSelector((state) => state.projects.status === 'loading');

    useEffect(() => {
        dispatch(getProjectAsync(projectId));
    }, [dispatch, projectId]);

    if (loading || !project) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />
            <Box mt={10}>
                <DetailedProjectInfo project={project}/>
                <Divider />
                <CommentsSection project={project}/>
            </Box>
        </>
    )
}