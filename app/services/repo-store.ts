import Service from '@ember/service';
import { service } from '@ember/service';
import type AppStore from './store';
import { RequestSignature } from '@warp-drive/core-types/symbols';

export type BranchResponse = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
};

export type RepoResponse = {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
};

type MyRequest<Type> = {
  url: string;
  method: 'GET';
  [RequestSignature]: Type;
};

function githubGet<Type>(type: string, id: string): MyRequest<Type> {
  const baseUrl = 'https://api.github.com';
  return {
    url: `${baseUrl}/${type}/${id}/repos`,
    method: 'GET',
  } as MyRequest<Type>;
}

export default class RepoStoreService extends Service {
  baseUrl = 'https://api.github.com';

  @service declare store: AppStore;

  async fetchRepos(organization: string) {
    this.store.unloadAll('repo');

    const res = await this.store.requestManager.request<RepoResponse[]>(
      githubGet('orgs', organization),
    );

    this.store.push({
      data: res.content.map((repo: RepoResponse) => ({
        type: 'repo',
        id: repo.id.toString(),
        attributes: repo,
      })),
    });

    res.content.forEach((repo: RepoResponse) => {
      this.fetchBranches(organization, repo).catch((err) => {
        console.error(err);
      });
    });
  }

  async fetchBranches(organization: string, repo: RepoResponse) {
    this.store.unloadAll('branch');

    const res = await this.store.requestManager.request<BranchResponse[]>({
      url: `${this.baseUrl}/repos/${organization}/${repo.name}/branches`,
    });

    res.response?.headers.get('link');

    this.store.push({
      data: res.content.map((branch) => ({
        type: 'branch',
        id: `${repo.id}-${branch.name}`,
        attributes: branch,
        relationships: {
          repo: {
            data: {
              type: 'repo',
              id: repo.id.toString(),
            },
          },
        },
      })),
    });
  }
}
