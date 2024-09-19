import { COMMAND_NAME } from '../../shared/contants/index.js';
import { TSVFileGenerator } from '../../shared/libs/file-generator/index.js';
import { Command } from './command.interface.js';
import axios from 'axios';
import { ResponseData } from '../../shared/types/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';

export class GenerateCommand implements Command {
  private initialData: ResponseData | null = null;

  public getName(): string {
    return COMMAND_NAME.GENERATE;
  }

  private async load(url: string) {
    try {
      const { data: res } = await axios.get(url);
      this.initialData = res;
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvFileGenerator = new TSVFileGenerator(this.initialData as ResponseData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvFileGenerator.generate());
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, path, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(path, offerCount);
      console.log(`File ${path} was created!`);

    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
