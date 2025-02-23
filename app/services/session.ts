import Service from '@ember/service';

export default class SessionService extends Service {
  declare authToken: string;
  declare organization: string;
  constructor() {
    super();
    this.authToken = localStorage.getItem('authToken') || '';
    this.organization = localStorage.getItem('organization') || '';
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  setOrganization(organization: string) {
    this.organization = organization;
    localStorage.setItem('organization', organization);
  }
}

declare module '@ember/service' {
  interface Registry {
    session: SessionService;
  }
}
