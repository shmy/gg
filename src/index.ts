import {Command, flags} from '@oclif/command'
import * as path from 'path'
import ImplGenerator from './generator/impl-generator';
import MysqlDatasource from './datasource/mysql-datasource';
import {Generator, GeneratorResult} from './generator/generator';
import MysqlResolver from './resolver/mysql-resolver';
import * as fs from 'fs';
import {readSync} from 'readdir';
import * as humps from 'humps';
import {getRegExpMapper, Type2Define} from './util/typeMapper';

class Gg extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    config: flags.string({char: 'c', description: 'config path'}),
    input: flags.string({char: 'i', description: 'input path'}),
    output: flags.string({char: 'o', description: 'output path'}),
    table: flags.string({char: 't', description: 'table name'}),
  }

  static args = []
  private generator: Generator = new ImplGenerator();

  async run() {
    const {flags} = this.parse(Gg)
    const configPath = path.resolve(flags.config!);
    const {db, types} = await import(configPath);
    switch (db.type.toLowerCase()) {
      case 'mysql':
        await this.mysqlDo(db, flags.table!, types.java_mysql, flags.input!, flags.output!);
        break;
      default:
        this.error(`type: ${db.type} not supported`);
    }
  }

  private parsePath(inputPath: string, outputPath: string): { input: string; output: string }[] {
    const absoluteInputPath = path.resolve(inputPath);
    const absoluteOutputPath = path.resolve(outputPath);
    const stats: fs.Stats = fs.statSync(absoluteInputPath);
    if (stats.isFile()) {
      return [
        {input: absoluteInputPath, output: absoluteOutputPath}
      ];
    } else if (stats.isDirectory()) {
      const filePathList = readSync(absoluteInputPath,);
      return filePathList.map(filePath => {
        return {
          input: path.join(absoluteInputPath, filePath),
          output: path.join(absoluteOutputPath, filePath),
        };
      });
    }
    return [];
  }

  private execute(tableName: string, result: GeneratorResult, inputPath: string, outputPath: string): void {
    const d = path.parse(outputPath);
    outputPath = path.join(d.dir, humps.pascalize(tableName + '_' + d.base));
    this.generator.save(result, inputPath, outputPath);
  }

  private async mysqlDo(db: any, tableName: string, types: Type2Define, inputPath: string, outputPath: string) {
    const datasource = new MysqlDatasource();
    const resolver = new MysqlResolver();
    await datasource.connect({
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
    });
    const columnsRaws = await datasource.query(`DESC ${tableName}`);
    const columns = resolver.resolve(columnsRaws[0], getRegExpMapper(types));
    const result = this.generator.generate(tableName, columns);
    const paths = this.parsePath(inputPath, outputPath);
    for (let pathItem of paths) {
      this.execute(tableName, result, pathItem.input, pathItem.output);
    }
    datasource.disconnect();
  }
}

export = Gg
