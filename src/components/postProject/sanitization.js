import DOMPurify from 'dompurify';


export default function sanitizeProjectInput(formData, toast) {
    const maxNameLength = 50;
    const maxDescriptionLength = 500;
    const githubUrlPattern = /^https:\/\/github\.com\/.+$/;
    const imageUrlPattern = /^(|https:\/\/.+\.(jpg|jpeg|png|gif|webp))$/;

    const sanitizedData = {
        name: DOMPurify.sanitize(formData.name.trim()),
        repoLink: DOMPurify.sanitize(formData.repoLink.trim()),
        description: DOMPurify.sanitize(formData.description.trim()),
        projectImgURL: DOMPurify.sanitize(formData.projectImgURL.trim())
      };

    if (sanitizedData.name.length > maxNameLength) {
      toast({
        title: "Invalid name length",
        description: "Name must not exceed 50 characters. Currently " + sanitizedData.name.length,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    if (sanitizedData.description.length > maxDescriptionLength) {
      toast({
        title: "Invalid description length",
        description: "Description must not exceed 500 characters. Currently " + sanitizedData.description.length,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    if (!githubUrlPattern.test(sanitizedData.repoLink)) {
      toast({
        title: "Invalid GitHub URL",
        description: "URL should begin with 'https://github.com/'",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    if (!imageUrlPattern.test(sanitizedData.projectImgURL)) {
      toast({
        title: "Invalid Project Image URL",
        description: "URL should begin with 'https://' and end with '.jpg', '.jpeg', '.png', '.gif', or '.webp'",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }
    
    return true;
}