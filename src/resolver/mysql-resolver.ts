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
      return "java.math.BigDecimal";
    }
    if (/(^CHAR)|(^VARCHAR)|(^TINYTEXT)|(^TEXT)|(^MEDIUMTEXT)|(^LONGTEXT)/i.test(type)) {
      return "String";
    }
    if (/^DATE/i.test(type)) {
      return "java.sql.Date";
    }
    if (/^TIME$/i.test(type)) {
      return "java.sql.Time";
    }
    if (/^TIMESTAMP$/i.test(type)) {
      return "java.sql.Timestamp";
    }
    if (/(^TINYBLOB)|(^BLOB)|(^MEDIUMBLOB)|(^LONGBLOB)/i.test(type)) {
      return "Byte[]";
    }
    return "Unknown";
  }
}

export default MysqlResolver;
