import Header from "../components/Header";
import SearchBarHeader from "../components/projectHub/SearchBarHeader/SearchBarHeader";
import FilterForm from "../components/projectHub/FilterForm";
import ProjectListHeader from "../components/projectHub/ProjectListHeader/ProjectListHeader";
import ProjectCards from "../components/projectCards/ProjectCards";
import { Flex } from "@chakra-ui/react";

export default function ProjectHubPage() {
  return (
    <Flex direction="column" width="100%">
      <Header></Header>
      <Flex direction="column" width="100%">
        <SearchBarHeader></SearchBarHeader>
        <Flex gap="50px" width="100%">
          <FilterForm></FilterForm>
          <Flex direction="column" width="80%">
            <ProjectListHeader></ProjectListHeader>
            <ProjectCards></ProjectCards>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
