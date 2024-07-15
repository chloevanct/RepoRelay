import React from "react";
import { Flex, Divider } from "@chakra-ui/react";
import EditableProjectInfo from "./EditableProjectInfo";
import ProjectContributors from "./ProjectContributors";
import ProjectTags from "./ProjectTags";
import ProjectProgress from "./ProjectProgress";

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
