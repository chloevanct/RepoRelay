import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import { getProjectAsync } from '../redux/projects/projectCardThunks';
import Header from '../components/Header';
import DetailedProjectInfo from '../components/projectDetails/DetailedProjectInfo';
import CommentsSection from '../components/projectDetails/CommentsSection';

import { Box, Divider, Spinner, Container } from '@chakra-ui/react';

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.projects.find(p => p.projectID === projectId));
  const projectLoading = useSelector((state) => state.projects.status === 'loading');
  const currentUser = useSelector((state) => state.user.currentUser);
  const userLoading = useSelector((state) => state.user.status === 'pending');

  useEffect(() => {
    if (!project) {
      dispatch(getProjectAsync(projectId));
    }
  }, [dispatch, projectId, project]);

  if (projectLoading || userLoading || !project || !currentUser) {
    return (
      <Container centerContent mt={5}>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Box mt={10}>
        <DetailedProjectInfo project={project} />
        <Divider />
        <CommentsSection project={project} />
      </Box>
    </>
  );
}
