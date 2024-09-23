import { Logger } from '../logger/types.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger
  ) {}

  public async init() {
    this.logger.info('Application initialization');
  }
}
