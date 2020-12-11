import {RegExpMapper, Resolver, ResolverResult} from './resolver';

class MysqlResolver implements Resolver {
  resolve(data: any, type2define: RegExpMapper[]): ResolverResult[] {
    return (data as any[]).map(item => {
      return {
        field: item.Field,
        type: MysqlResolver.typeTransform(item.Type, type2define),
        default: item.Default,
        isAllowNull: item.Null === "YES",
        isPrimaryKey: item.Key === "PRI",
        isAutoIncrement: item.Extra === "auto_increment",
      };
    });
  }
  private static typeTransform(type: string, type2define: RegExpMapper[]) {
   for (let item of type2define) {
     if (item.reg.test(type)) {
       return item.val;
     }
   }
    return "!Unknown";
  }
}

export default MysqlResolver;
