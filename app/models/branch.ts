import Model, { attr, belongsTo } from '@ember-data/model';
import type Repo from './repo';
import type { Type } from '@warp-drive/core-types/symbols';

export default class Branch extends Model {
  declare [Type]: 'branch';

  @attr('string') declare name: string;
  @attr() declare commit: { sha: string; url: string };
  @attr('boolean') declare protected: boolean;
  @belongsTo<Repo>('repo', { async: false, inverse: 'branches' })
  declare repo: Repo | null;
}
