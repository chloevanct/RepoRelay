import Header from "../components/Header";
import { useEffect, useState } from "react";

import SearchBarHeader from "../components/projectHub/SearchBarHeader/SearchBarHeader";
import FilterForm from "../components/projectHub/FilterForm";
import ProjectListHeader from "../components/projectHub/ProjectListHeader/ProjectListHeader";
import ProjectCards from "../components/projectCards/ProjectCards";
import { Flex } from "@chakra-ui/react";

export default function ProjectHubPage() {
  const [userName, setUserName] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        const response = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name);
        } else {
          console.error("Failed to fetch GitHub profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    };

    if (token) {
      fetchGitHubProfile();
    }
  }, [token]);

  console.log(token);
  console.log(userName);

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
