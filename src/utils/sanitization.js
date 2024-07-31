import DOMPurify from 'dompurify';

const MAX_NAME_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_TASK_LENGTH = 250;
const MAX_COMMENT_LENGTH = 250;
const GITHUB_URL_PATTERN = /^https:\/\/github\.com\/.+$/;
const IMG_URL_PATTERN = /^(|https:\/\/.+\.(jpg|jpeg|png|gif|webp))$/;

export const sanitizeText = (text) => DOMPurify.sanitize(text.trim());
export const sanitizeTaskBody = (taskBody) => sanitizeText(taskBody);
export const sanitizeCommentBody = (commentBody) => sanitizeText(commentBody);

export const validateName = (name, toast, maxLength = MAX_NAME_LENGTH) => {
    if (name.length > maxLength) {
        toast({
            title: "Invalid name length",
            description: `Name must not exceed ${maxLength} characters. Currently ${name.length}`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
        return false;
    }
    return true;
};

export const validateDescription = (description, toast, maxLength = MAX_DESCRIPTION_LENGTH) => {
    if (description.length > maxLength) {
        toast({
            title: "Invalid description length",
            description: `Description must not exceed ${maxLength} characters. Currently ${description.length}`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
        return false;
    }
    return true;
};

export const validateGithubUrl = (url, toast, pattern = GITHUB_URL_PATTERN) => {
    if (!pattern.test(url)) {
        toast({
            title: "Invalid GitHub Repo URL",
            description: "URL should begin with 'https://github.com/'",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
        return false;
    }
    return true;
};

export const validateImageUrl = (url, toast, pattern = IMG_URL_PATTERN) => {
    if (!pattern.test(url)) {
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
};

export const validateTaskBody = (taskBody, toast, maxLength = MAX_TASK_LENGTH) => {
  if (taskBody.length > maxLength) {
      toast({
          title: "Invalid Task",
          description: `Task body must not exceed ${maxLength} characters. Currently ${taskBody.length}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
      });
      return false;
  }
  return true;
};

export const validateCommentBody = (commentBody, toast, maxLength = MAX_COMMENT_LENGTH) => {
  if (commentBody.length > maxLength) {
      toast({
          title: "Invalid Comment",
          description: `Comment body must not exceed ${maxLength} characters. Currently ${commentBody.length}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
      });
      return false;
  }
  return true;
};

export default function sanitizeAllNewProjectFields(formData, toast) {

    const sanitizedData = {
        name: sanitizeText(formData.name),
        repoLink: sanitizeText(formData.repoLink),
        description: sanitizeText(formData.description),
        projectImgURL: sanitizeText(formData.projectImgURL),
        tasksCompleted: formData.tasksCompleted.map(sanitizeTaskBody),
        tasksToComplete: formData.tasksToComplete.map(sanitizeTaskBody)
    };

    if (
      (!validateName(sanitizedData.name, toast)) ||
      (!validateDescription(sanitizedData.description, toast)) ||
      (!validateGithubUrl(sanitizedData.repoLink, toast)) ||
      (!validateImageUrl(sanitizedData.projectImgURL, toast))) 
    {
      return false;
    }
    
    for (const task of sanitizedData.tasksCompleted) {
        if (!validateTaskBody(task, toast)) return false;
    }
    for (const task of sanitizedData.tasksToComplete) {
        if (!validateTaskBody(task, toast)) return false;
    }
    
    return sanitizedData;
}
