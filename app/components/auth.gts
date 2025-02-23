import { service } from '@ember/service';
import Component from '@glimmer/component';
import type SessionService from '../services/session';
import type Store from '@ember-data/store';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

export default class Auth extends Component {
  @service declare session: SessionService;
  @service declare store: Store;

  @tracked authToken = '';

  constructor(owner: unknown, args: unknown) {
    super(owner, args);
    this.authToken = this.session.authToken;
  }

  @action
  setAuthToken(event: Event) {
    const input = event.target as HTMLInputElement;
    this.authToken = input.value;
  }

  @action
  login() {
    this.session.setAuthToken(this.authToken);
  }

  <template>
    <div>
      <form>
        <label for="auth-token">Auth Token</label>
        <input
          type="text"
          value={{this.authToken}}
          id="auth-token"
          {{on "input" this.setAuthToken}}
        />
        <button type="button" {{on "click" this.login}}>Login</button>
      </form>
    </div>
  </template>
}
