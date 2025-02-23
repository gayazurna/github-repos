import Model, { attr, hasMany, type HasMany } from '@ember-data/model';
import type { Type } from '@warp-drive/core-types/symbols';
import type Branch from './branch';

export default class Repo extends Model {
  declare [Type]: 'repo';

  @attr('string') declare name: string;
  @attr('string') declare description: string;
  @attr('string') declare url: string;
  @attr('string') declare language: string;
  @attr('number') declare stargazersCount: number;
  @attr('boolean') declare private: boolean;
  @attr('number') declare branchesCount: number;

  @hasMany<Branch>('branch', { async: false, inverse: 'repo' })
  declare branches: HasMany<Branch>;
}
