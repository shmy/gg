import {Resolver, ResolverResult} from "./resolver";

class MysqlResolver implements Resolver {
  resolve(data: any): ResolverResult[] {
    return (data as any[]).map(item => {
      return {
        field: item.Field,
        type: MysqlResolver.type2java(item.Type),
        default: item.Default,
        isAllowNull: item.Null === "YES",
        isPrimaryKey: item.Key === "PRI",
        isAutoIncrement: item.Extra === "auto_increment",
      };
    });
  }

  private static type2java(type: string) {
    if (/(^INT)|(^TINYINT)|(^SMALLINT)|(^MEDIUMINT)/i.test(type)) {
      return "Integer";
    }
    if (/^BIGINT/i.test(type)) {
      return "Long";
    }
    if (/^FLOAT/i.test(type)) {
      return "Float";
    }
    if (/^DOUBLE/i.test(type)) {
      return "Double";
    }
    if (/^DECIMAL/i.test(type)) {
      return "BigDecimal";
    }
    if (/(^CHAR)|(^VARCHAR)|(^TINYBLOB)|(^TINYTEXT)|(^TEXT)|(^MEDIUMTEXT)|(^LONGTEXT)/i.test(type)) {
      return "String";
    }
    return "Unknown";
  }
}

export default MysqlResolver;
