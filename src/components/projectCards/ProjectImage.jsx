import { Image } from '@chakra-ui/react'
import GitHubLogo from "../../assets/github-logo.png";

/**
 * Renders a project's image. Meant for use as part of the ProjectCard component.
 *
 * @param {Object} project - The project data to be displayed.
 *
 * @returns {JSX.Element} The rendered project image component.
 */
export default function ProjectImage({ project }) {
    return (
        <Image
            width='20%' 
            height='100%'
            padding={['5px', '10px']}
            objectFit='cover' 
            display={['none', 'block']}
            src={project.projectImgURL} 
            alt={project.projectName} 
            fallbackSrc={GitHubLogo}
        />
    )
}