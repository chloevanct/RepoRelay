import React from "react";
import Header from "../components/Header";
import ProjectInfoForm from "../components/postProject/ProjectInfoForm";
import { Box } from "@chakra-ui/react";

/**
 * PostProjectPage parent component that contains the form for posting a new project.
 * 
 * @returns {JSX.Element} The rendered About Us page.
 */
export default function PostProjectPage() {
  return (
    <Box id="postProjectPage">
      <Header />
      <ProjectInfoForm />
    </Box>
  );
}
