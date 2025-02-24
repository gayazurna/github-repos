import Component from '@glimmer/component';
import RepoStoreService from 'github-repos/services/repo-store';
import type AppStore from 'github-repos/services/store';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { on } from '@ember/modifier';

export default class Organization extends Component {
  @tracked organization = '';
  @tracked filterLanguage = '';

  @service declare store: AppStore;
  @service declare repoStore: RepoStoreService;

  @action
  async loadOrganization() {
    await this.repoStore.fetchRepos(this.organization);
  }

  @action
  setOrganization(event: Event) {
    const input = event.target as HTMLInputElement;
    this.organization = input.value;
  }

  get repos() {
    if (this.filterLanguage) {
      return this.store
        .peekAll('repo')
        .filter((repo) => repo.language === this.filterLanguage);
    }

    return this.store.peekAll('repo');
  }

  <template>
    <div>
      <h1>GitHub Organization Repositories</h1>
      <label for="organization">Organization</label>
      <input
        type="text"
        id="organization"
        {{on "input" this.setOrganization}}
      />
      <button type="button" {{on "click" this.loadOrganization}}>Load</button>
      {{#each this.repos as |repo|}}
        <div>
          <h2>
            <a
              href="https://github.com/{{repo.fullName}}"
              alt="{{repo.name}}"
            >{{repo.name}}</a>
          </h2>
          <p>
            {{#if repo.private}}
              Private
            {{else}}
              Public
            {{/if}}
          </p>
          <p>Description: {{repo.description}}</p>
          <p>Language: {{repo.language}}</p>
          <p>Number of branches: {{repo.branches.length}}</p>
          <ul>
            {{#each repo.branches as |branch|}}
              <li>
                <a
                  href="https://github.com/{{repo.fullName}}/tree/{{branch.name}}"
                  alt="{{branch.name}}"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{branch.name}}</a>
              </li>
            {{/each}}
          </ul>
        </div>
      {{/each}}
    </div>
  </template>
}
