export interface Resolver {
  resolve: (data: any) => ResolverResult[];
}

export interface ResolverResult {
  field: string;
  type: string;
  default: any;
  isAllowNull: boolean;
  isPrimaryKey: boolean;
  isAutoIncrement: boolean;
}

