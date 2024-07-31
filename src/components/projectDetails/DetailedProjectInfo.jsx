import React from "react";
import { Flex, Divider } from "@chakra-ui/react";
import EditableProjectInfo from "./EditableProjectInfo";
import ProjectContributors from "./ProjectContributors";
import ProjectTags from "./ProjectTags";
import ProjectProgress from "./ProjectProgress";

/**
 * A parent component that displays detailed information about a project.
 *   Child components include editable details, contributors, tags, and progress.
 *
 * @param {Object} project - The project object containing detailed information.
 * 
 * @returns {JSX.Element} The rendered DetailedProjectInfo component.
 */
export default function DetailedProjectInfo({ project }) {
  return (
    <Flex direction="column">
      <EditableProjectInfo project={project} />
      <Divider mb="10px" />
      <ProjectContributors project={project} />
      <Divider mb="10px" />
      <ProjectTags project={project} mb="10px" />
      <Divider mb="10px" />
      <ProjectProgress project={project} />
    </Flex>
  );
}
