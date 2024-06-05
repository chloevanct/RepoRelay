import { Image } from '@chakra-ui/react'
import GitHubLogo from "../../assets/github-logo.png";


export default function ProjectImage({ card }) {
    return (
        <Image
            width='20%' 
            height='100%'
            padding='10px' 
            objectFit='cover' 
            src={card.projectImg} 
            alt={card.projectName} 
            fallbackSrc={GitHubLogo}
        />
    )
}