import {ResolverResult} from "../resolver/resolver";

export interface Generator {
  generate: (tableName: string, fields: ResolverResult[]) => GeneratorResult;
  save: (context: GeneratorResult, templatePath: string, destinationPath: string) => void;
}
export interface GeneratorResult {
  tableName: string;
  fields: any[];
  primaryKeyField: any;
  primaryKeyType: string;
}
