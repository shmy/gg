import {Generator, GeneratorResult} from "./generator";
import {ResolverResult} from "../resolver/resolver";
import edge from "../util/edge";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from 'path';

class ImplGenerator implements Generator {
  generate(tableName: string, fields: ResolverResult[]): GeneratorResult {
    const primaryKey = fields.filter(field => field.isPrimaryKey)[0];
    return {
      tableName,
      fields,
      primaryKeyField: primaryKey,
      primaryKeyType: primaryKey.type,
    };
  }
  save(context: GeneratorResult, templatePath: string, destinationPath: string): void {
    const content = edge.renderString(fs.readFileSync(templatePath, {encoding: "utf-8"}), context);
    mkdirp.sync(path.parse(destinationPath).dir);
    fs.writeFileSync(destinationPath, content, {encoding: "utf-8"});
  }
}

export default ImplGenerator;
