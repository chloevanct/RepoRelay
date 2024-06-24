import axios from "axios";

class GitHubClient {
  constructor(accessToken = null) {
    this.baseUrl = "https://api.github.com";
    this.headers = {
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (accessToken) {
      this.headers["Authorization"] = `token ${accessToken}`;
    }
    this.userLogin = null; // Field to store user login
  }

  async getUser() {
    try {
      const response = await axios.get(`${this.baseUrl}/user`, {
        headers: this.headers,
      });
      this.userLogin = response.data.login; // Update the user login field
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch authenticated user info: ${error.response.status}`
      );
    }
  }

  async getRepos() {
    if (!this.userLogin) {
      throw new Error("User login is not set. Call getUser() first.");
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/users/${this.userLogin}/repos`,
        {
          headers: this.headers,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch repos for user ${this.userLogin}: ${error.response.status}`
      );
    }
  }
}

const client = new GitHubClient("your_token_here");

async function main() {
  try {
    const user = await client.getUser();
    console.log("User:", user);

    const repos = await client.getRepos();
    console.log("Repos:", repos);
  } catch (error) {
    console.error(error.message);
  }
}

main();

export default GitHubClient;
