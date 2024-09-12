import chalk from 'chalk';
import { Command } from './command.interface.js';
import { COMMAND_NAME } from '../../shared/contants/index.js';

export class HelpCommand implements Command {
  public getName(): string {
    return COMMAND_NAME.HELP;
  }

  public execute(..._parameters: string[]): void {
    console.log(chalk.blue(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `));
  }
}
