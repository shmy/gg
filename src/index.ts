import {Command, flags} from '@oclif/command'
import * as path from 'path'
import ImplGenerator from './generator/impl-generator';
import MysqlDatasource from './datasource/mysql-datasource';
import {Datasource} from './datasource/datasource';
import {Resolver, ResolverResult} from './resolver/resolver';
import {Generator} from './generator/generator';
import MysqlResolver from './resolver/mysql-resolver';
import * as fs from 'fs';
import { readSync } from 'readdir';
import * as humps from "humps";

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

  async run() {
    const {flags} = this.parse(Gg)
    const configPath = path.resolve(flags.config!);

    const tableName = flags.table!;
    const {db} = await import(configPath);
    let datasource: Datasource;
    let resolver: Resolver;
    const generator: Generator = new ImplGenerator();
    switch (db.type) {
      case 'mysql':
        datasource = new MysqlDatasource();
        resolver = new MysqlResolver();
        break;
      default:
        this.error(`type: ${db.type} not supported`);
    }
    const paths = this.parsePath(flags.input!, flags.output!);
    await datasource.connect({
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
    });
    const columnsRaws = await datasource.query(`DESC ${flags.table}`);
    const columns = resolver.resolve(columnsRaws[0]);
    for (let pathItem of paths) {
      this.execute(generator, tableName, columns, pathItem.input, pathItem.output);
    }
    datasource.disconnect();
  }

  private parsePath(inputPath: string, outputPath: string): { input: string; output: string}[] {
    const absoluteInputPath = path.resolve(inputPath);
    const absoluteOutputPath = path.resolve(outputPath);
    const stats: fs.Stats = fs.statSync(absoluteInputPath);
    if (stats.isFile()) {
      return [
        {input: absoluteInputPath, output: absoluteOutputPath}
      ];
    } else if (stats.isDirectory()) {
      const filePathList = readSync(absoluteInputPath, );
      return filePathList.map(filePath => {
        return {
          input: path.join(absoluteInputPath, filePath),
          output: path.join(absoluteOutputPath, filePath),
        };
      });
    }
    return [];
  }

  private execute(generator: Generator, tableName: string, fields: ResolverResult[], inputPath: string, outputPath: string): void {
    const content = generator.generate(tableName, fields);
    const d = path.parse(outputPath);
    outputPath = path.join(d.dir, humps.pascalize(tableName + '_' + d.base));
    generator.save(content, inputPath, outputPath);
  }
}

export = Gg
