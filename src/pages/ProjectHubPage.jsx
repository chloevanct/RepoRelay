import React, { useState } from "react";
import Header from "../components/Header";
import SearchBarHeader from "../components/projectHub/SearchBarHeader/SearchBarHeader";
import FilterForm from "../components/projectHub/FilterForm";
import ProjectListHeader from "../components/projectHub/ProjectListHeader/ProjectListHeader";
import ProjectCards from "../components/projectCards/ProjectCards";
import { Flex } from "@chakra-ui/react";

/**
 * ProjectHubPage component serves as the main page for exploring projects.
 * Includes a header, a search bar, a filter form, a project list header, 
 * and a list of project cards. 
 * 
 * @returns {JSX.Element} The rendered Project Hub page.
 */
export default function ProjectHubPage() {
  const [sortOption, setSortOption] = useState('Newest');

  return (
    <Flex direction="column" width="100%">
      <Header />
      <Flex direction="column" width="100%">
        <SearchBarHeader></SearchBarHeader>
        <Flex gap="auto" width="100%">
          <FilterForm width='20%'></FilterForm>
          <Flex direction="column" boxSizing="border-box">
            <ProjectListHeader chosenOption={sortOption} setChosenOption={setSortOption} />
            <ProjectCards sortOption={sortOption} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
