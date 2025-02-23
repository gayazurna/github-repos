import Store from 'ember-data/store';
import RequestManager from '@ember-data/request';
import { service } from '@ember/service';

export default class AppStore extends Store {
  @service declare requestManager: RequestManager;
}

declare module '@ember/service' {
  interface Registry {
    store: AppStore;
  }
}
