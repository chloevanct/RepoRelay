import { Image } from '@chakra-ui/react'
import GitHubLogo from "../../assets/github-logo.png";


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