export interface Resolver {
  resolve: (data: any, type2define: RegExpMapper[]) => ResolverResult[];
}

export interface ResolverResult {
  field: string;
  type: string;
  default: any;
  isAllowNull: boolean;
  isPrimaryKey: boolean;
  isAutoIncrement: boolean;
}
export interface RegExpMapper {
  reg: RegExp;
  val: string;
}
