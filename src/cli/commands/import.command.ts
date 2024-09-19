import { COMMAND_NAME } from '../../shared/contants/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return COMMAND_NAME.IMPORT;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const tsvFileReader = new TSVFileReader(filename);

    try {
      await tsvFileReader.read();
      console.log(tsvFileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
