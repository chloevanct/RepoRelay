import { Image } from '@chakra-ui/react'
import GitHubLogo from "../../assets/github-logo.png";


export default function ProjectImage({ project }) {
    return (
        <Image
            width='20%' 
            height='100%'
            padding={['5px', '10px']}
            objectFit='cover' 
            src={project.projectImg} 
            alt={project.projectName} 
            fallbackSrc={GitHubLogo}
        />
    )
}