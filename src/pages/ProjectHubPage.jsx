import React, { useState } from "react";
import Header from "../components/Header";
import SearchBarHeader from "../components/projectHub/SearchBarHeader/SearchBarHeader";
import FilterForm from "../components/projectHub/FilterForm";
import ProjectListHeader from "../components/projectHub/ProjectListHeader/ProjectListHeader";
import ProjectCards from "../components/projectCards/ProjectCards";
import { Flex } from "@chakra-ui/react";

export default function ProjectHubPage() {
  const [sortOption, setSortOption] = useState('Newest');

  return (
    <Flex direction="column" width="100%">
      <Header></Header>
      <Flex direction="column" width="100%">
        <SearchBarHeader></SearchBarHeader>
        <Flex gap="auto" width="100%">
          <FilterForm></FilterForm>
          <Flex direction="column" width="80%">
            <ProjectListHeader chosenOption={sortOption} setChosenOption={setSortOption} />
            <ProjectCards sortOption={sortOption} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
