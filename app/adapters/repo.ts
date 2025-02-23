import { service } from '@ember/service';
import type SessionService from '../services/session';
import RESTAdapter from '@ember-data/adapter/rest';

export default class RepoAdapter extends RESTAdapter {
  @service declare session: SessionService;

  // @ts-expect-error: Override the default headers
  get host() {
    return `https://api.github.com/orgs/${this.session.organization}/repos`;
  }

  // @ts-expect-error: Override the default headers
  get headers() {
    return {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${this.session.authToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }
}
