import { useSelector, useDispatch } from "react-redux";

import { updateUserPreferences } from "../redux/user/updateUserPreferences";
import {
  setUser,
  updateUser,
  updateUserID,
  updateGithubUsername,
  updatePassword,
  updateOwnedProjects,
  updateSubscribedProjects,
  updateFirstName,
  updateLastName,
  updateUserImage,
  updateEmailAddress,
  updateDifficultyTags,
  updateProjectTags,
  updateTechTags,
} from "../redux/user/userActions";

export const useUser = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSetUser = (user) => dispatch(setUser(user));
  const handleUpdateUser = (updates) => dispatch(updateUser(updates));
  const handleUpdateUserID = (userID) => dispatch(updateUserID(userID));
  const handleUpdateGithubUsername = (githubUsername) =>
    dispatch(updateGithubUsername(githubUsername));
  const handleUpdatePassword = (password) => dispatch(updatePassword(password));
  const handleUpdateOwnedProjects = (ownedProjects) =>
    dispatch(updateOwnedProjects(ownedProjects));
  const handleUpdateSubscribedProjects = (subscribedProjects) =>
    dispatch(updateSubscribedProjects(subscribedProjects));
  const handleUpdateFirstName = (firstName) =>
    dispatch(updateFirstName(firstName));
  const handleUpdateLastName = (lastName) => dispatch(updateLastName(lastName));
  const handleUpdateUserImage = (userImage) =>
    dispatch(updateUserImage(userImage));
  const handleUpdateEmailAddress = (emailAddress) =>
    dispatch(updateEmailAddress(emailAddress));

  //   const handleUpdateDifficultyTags = (difficultyTags) =>
  //     dispatch(updateDifficultyTags(difficultyTags));

  //   const handleUpdateProjectTags = (projectTags) =>
  //     dispatch(updateProjectTags(projectTags));

  //   const handleUpdateTechTags = (techTags) => dispatch(updateTechTags(techTags));

  const handleUpdateDifficultyTags = (difficultyTags) =>
    handleUpdatePreferences({ difficultyTags });
  const handleUpdateProjectTags = (projectTags) =>
    handleUpdatePreferences({ projectTags });
  const handleUpdateTechTags = (techTags) =>
    handleUpdatePreferences({ techTags });

  const handleUpdatePreferences = async (updatedPreferences) => {
    try {
      const preferences = {
        ...currentUser.preferences,
        ...updatedPreferences,
      };
      const updatedUser = await updateUserPreferences(
        currentUser.githubUsername,
        { preferences }
      );
      dispatch(setUser(updatedUser.currentUser));
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  return {
    currentUser,
    handleSetUser,
    handleUpdateUser,
    handleUpdateUserID,
    handleUpdateGithubUsername,
    handleUpdatePassword,
    handleUpdateOwnedProjects,
    handleUpdateSubscribedProjects,
    handleUpdateFirstName,
    handleUpdateLastName,
    handleUpdateUserImage,
    handleUpdateEmailAddress,
    handleUpdateDifficultyTags,
    handleUpdateProjectTags,
    handleUpdateTechTags,
  };
};
