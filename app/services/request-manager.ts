import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';
import { setOwner, getOwner } from '@ember/owner';
import AuthHandler from 'github-repos/handlers/auth';

export default class extends RequestManager {
  constructor(args?: Record<string | symbol, unknown>) {
    super(args);
    const authHandler = new AuthHandler();
    const owner = getOwner(this);
    if (owner) {
      setOwner(authHandler, owner);
    }
    this.use([authHandler, Fetch]);
  }
}
