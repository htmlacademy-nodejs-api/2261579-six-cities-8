import { inject, injectable } from 'inversify';
import { RestSchema } from '../config/schema.js';
import { Config } from '../config/types.js';
import { Logger } from '../logger/types.js';
import { Component } from '../../types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
