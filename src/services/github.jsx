import { Octokit } from "@octokit/rest";

class GitHubService {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
  }

  async getRepository(owner, repo) {
    const response = await this.octokit.rest.repos.get({ owner, repo });
    return response.data;
  }

  async getRepositoryLanguages(owner, repo) {
    const response = await this.octokit.rest.repos.listLanguages({ owner, repo });
    return response.data;
  }

  async getContributors(owner, repo) {
    const response = await this.octokit.rest.repos.listContributors({ owner, repo, per_page: 10 });
    return response.data;
  }
}

export default new GitHubService();
