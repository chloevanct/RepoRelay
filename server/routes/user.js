const express = require("express");
const axios = require("axios");
const User = require("../db/models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Get user info from GitHub API
    const githubResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const githubData = githubResponse.data;

    let firstName = "";
    let lastName = "";

    if (githubData.name) {
      const nameParts = githubData.name.split(" ");
      firstName = nameParts[0]; // Set firstName to the first part of the name

      if (nameParts.length > 1) {
        lastName = nameParts.slice(1).join(" "); // Set lastName to the rest of the name
      }
    }

    console.log(firstName, lastName);

    // Check if user exists in the database
    let user = await User.findOne({ githubUsername: githubData.login });

    if (!user) {
      // Create a new user if not found
      user = new User({
        userID: githubData.login,
        githubUsername: githubData.login,
        firstName: firstName,
        lastName: lastName,
        userImage: githubData.avatar_url,
        emailAddress: githubData.email,
        preferences: {
          difficultyTags: [],
          techTags: [],
          projectTags: [],
        },
      });

      await user.save();
    }

    // Prepare the response in the required format
    const responseData = {
      currentUser: {
        userID: user.userID,
        githubUsername: user.githubUsername,
        password: "", // Omit or handle as needed
        ownedProjects: user.ownedProjects,
        subscribedProjects: user.subscribedProjects,
        firstName: user.firstName,
        lastName: user.lastName,
        userImage: user.userImage,
        emailAddress: user.emailAddress,
        preferences: {
          difficultyTags: user.preferences.difficultyTags,
          projectTags: user.preferences.projectTags,
          techTags: user.preferences.techTags,
        },
      },
    };

    // res.json(responseData);

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH endpoint to update user data
router.patch("/:githubUsername", async (req, res) => {
  const { githubUsername } = req.params;
  const updateData = req.body;

  try {
    // Find user by GitHub username
    let user = await User.findOne({ githubUsername });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Before update user data:", user);

    // Update user with provided data
    Object.keys(updateData).forEach((key) => {
      if (key.startsWith('preferences.')) {
        const subKey = key.split('.')[1];
        user.preferences[subKey] = updateData[key];
      } else {
        user[key] = updateData[key];
      }
    });

    await user.save();

    console.log("After update user data:", user);

    // Prepare the response in the required format
    const responseData = {
      currentUser: {
        userID: user.userID,
        githubUsername: user.githubUsername,
        password: "", // Omit or handle as needed
        ownedProjects: user.ownedProjects,
        subscribedProjects: user.subscribedProjects,
        firstName: user.firstName,
        lastName: user.lastName,
        userImage: user.userImage,
        emailAddress: user.emailAddress,
        preferences: {
          difficultyTags: user.preferences.difficultyTags,
          projectTags: user.preferences.projectTags,
          techTags: user.preferences.techTags,
        },
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
