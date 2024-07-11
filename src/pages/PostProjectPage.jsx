import Header from '../components/Header'
import ProjectInfoForm from '../components/postProject/ProjectInfoForm'
import { Box } from '@chakra-ui/react'



export default function PostProjectPage() {
    
    return (
        <Box id='postProjectPage'>
            <Header />
            <ProjectInfoForm />
        </Box>
    )
}