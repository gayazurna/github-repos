import type { Handler, NextFn, RequestContext } from '@ember-data/request';
import { service } from '@ember/service';
import type SessionService from 'github-repos/services/session';

export default class AuthHandler implements Handler {
  @service declare session: SessionService;
  request<T>(context: RequestContext, next: NextFn<T>) {
    const headers = new Headers(context.request.headers);
    headers.append('Authorization', `Bearer ${this.session.authToken}`);
    return next(Object.assign({}, context.request, { headers }));
  }
}
